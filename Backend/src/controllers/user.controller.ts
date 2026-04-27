import type { Request,Response } from "express";
import bcrypt from 'bcrypt';
import  Jwt  from "jsonwebtoken";
import { prisma }  from '../../db'
import type { CreateUserInput } from "../schemas/user.schema";
// Business logic for the user(Creating the user (Admin and user))


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