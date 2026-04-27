import type { Request,Response } from "express";
import bcrypt from 'bcrypt';
import  Jwt  from "jsonwebtoken";
import { Resend } from "resend";
import { prisma }  from '../../db'
import type { CreateUserInput } from "../schemas/user.schema";
// Business logic for the user(Creating the user (Admin and user))

//Signup/Register function
export const createUser = async(req:Request<{},{},CreateUserInput>, res:Response):Promise<any>=>{
    try{

         const {name, email, phoneNo,role, password, address, city, zipcode} = req.body;

    const existingUser = await prisma.user.findUnique({
        where:{email}
    })

    if(existingUser){
        res.status(409).json({
            error: "User already exists"
        })
    }

    //password hashing
    let hashedPassword = null;

    if(password){
        const saltRounds = 10;
        hashedPassword  = await bcrypt.hash(password,saltRounds);
    }

    const newUser = await prisma.user.create({
        data:{
            name,
            email,
            role: role ?? "USER",
            password:hashedPassword,
            phoneNo,
            address,
            city,
            zipcode
        }
    });

    const {password:_, ...safeUser} = newUser;

    res.status(200).json({message:" User created successfully", user:safeUser});

    }catch(error){
        console.error("Error creating user");
        res.status(500).json({error:"error creating user"});
    }
   

}


//Login Function
export const loginUser = async(req:Request,res:Response):Promise<any>=>{
    try{

        const {email, password } = req.body;

        const user = await prisma.user.findUnique({
            where:{email},
        });

        if (!user || !user.password) {
        return res.status(401).json({ error: "Invalid email or password" });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if(!isValidPassword){
            res.status(500).json({
                error: "Invalid email or password" 
            });
        }

        //creating JWT using the userId and the Role

        const token = Jwt.sign(
            {userID:user.id, role:user.role},
            process.env.JWT_SECRET!,
            {expiresIn:"7d"}
        );

        const { password: _, ...userWithoutPassword } = user;

        res.cookie("token", token, {
        httpOnly: true, // Prevents JavaScript from reading the cookie
        secure: process.env.NODE_ENV === "production", // Must be true in production (HTTPS)
        sameSite: "lax", // Allows the cookie to be sent between your frontend and backend
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds (matches JWT expiration)
    });

        res.status(200).json({
        message: "Login successful",
        user: userWithoutPassword,
    });
    }catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to login" });
  }
}


// Function to generate OTP

const resend = new Resend(process.env.RESEND_API_KEY);

export const requestLoginOtp = async(req:Request, res:Response)=>{
    try{
        const {email} = req.body;
        const user = await prisma.user.findUnique({
            where:{email},
        });

        if(!user){
            res.status(404).json({
                error:"User not found"
            });
        }

        //generating a 6b digit otp
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // set expiration as 5 minutes
        const optExpiry = new Date(Date.now() + 5 * 60* 1000);

        //save in db

        await prisma.user.update({
            where: {email},
            data:{ loginOtp :otp, loginOtpExpiry:optExpiry},
        });

        //Email the code using Resend
        const{data,error}= await resend.emails.send({
            from: "Modysine Security <onboarding@resend.dev>",
            to: email,
            subject: "Your Modysine Admin Login Code",
            html: `<p>Your login code is: <strong>${otp}</strong>. It expires in 5 minutes.</p>`
        });

        if (error) {
        console.error("❌ RESEND API ERROR:", error);
        return res.status(400).json({ error: "Resend failed to send email", details: error });
        }

       
        console.log("✅ EMAIL SENT SUCCESSFULLY. Resend ID:", data);
        res.status(200).json({ message: "OTP sent to your email" });

    }catch(error){
        console.error(error);
        res.status(500).json({ error: "Failed to send OTP" });
    }
}


//fucntion to verify the otp

export const verifyLoginOtp = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user || !user.loginOtp || !user.loginOtpExpiry) {
      return res.status(400).json({ error: "No OTP requested for this email" });
    }

    // 1. Check if the code matches and hasn't expired
    const isExpired = new Date() > user.loginOtpExpiry;
    if (isExpired) {
      return res.status(401).json({ error: "OTP has expired. Please request a new one." });
    }

    if (user.loginOtp !== otp) {
      return res.status(401).json({ error: "Invalid OTP" });
    }

    // 2. Success! Clear the OTP from the database so it can't be reused
    await prisma.user.update({
      where: { email },
      data: { loginOtp: null, loginOtpExpiry: null },
    });

    // 3. Issue the JWT Cookie (Exactly like your previous login logic)
    const token = Jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Login successful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to verify OTP" });
  }
};