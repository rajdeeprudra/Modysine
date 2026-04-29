import type { Request,Response } from "express";
import cloudinary from "../config/cloudinary";

export const uploadImage = async(req:Request, res:Response)=>{
    try{
        if(!req.file){
           return res.status(404).json({error:"Error image file not found"});
        }

        //cloudinary can only read base64 string, so we gotta change this file to a base64 string

        const b64 = Buffer.from(req.file.buffer).toString("base64");
        const dataURI = "data:" + req.file.mimetype + ";base64," + b64;

        const result = await cloudinary.uploader.upload(dataURI, {
        folder: "modysine_products",
        });

        res.status(200).json({
         message: "Image uploaded successfully",
        imageUrl: result.secure_url,
        });

    }catch(err){
        console.log("CLoudinary error: ",err);
        res.status(500).json("Failed to upload image to Cloudinary");
    }
}

