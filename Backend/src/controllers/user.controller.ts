import type { Request,Response } from "express";
import bcrypt from 'bcrypt';
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