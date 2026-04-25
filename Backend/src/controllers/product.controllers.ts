import  type {Request,Response}  from 'express'
import { prisma }  from '../../db'
import { id } from 'zod/locales';
import type { productInput, getProductParamsSchema } from '../schemas/product.schema';


//get products

export const getAllTheProducts = async (req:Request,res:Response) => {
    try{

        const products = await prisma.product.findMany({
            where: {
                isActive:true
            },
            orderBy:{
                createdAt:'desc'
            }
        });
        res.status(200).json(products);

    }catch(error){
        console.error("error fetching all the products",error);
        res.status(500).json({msg: "failed to fetch products"});
    }
}

//get 1 product by id

export const getOneProduct = async(req:Request, res:Response)=> {
    try{
        
        const  id = req.params.id as string;

        const product = await prisma.product.findUnique({
            where:{id:id},    
        });

        if(!product) return res.status(404).json({ msg:"product not found" });

        res.status(200).json(product);
    }catch(error){
        console.error("error fetching the product", error);
        res.status(500).json({msg : "Error Fetching the product"});
    }


}

//create a product (for Admin use only)

export const createProduct = async(req:Request<{},{}, productInput>, res:Response)=> {
   try{
    const {name, description, price, images, isActive, color, stockCount} = req.body;
    
    const SIZES = ["S","M","L","XL","XXL"];

    const newProduct = await prisma.product.create({
        data: {
            name,
            images,
            description,
            price,
            isActive: isActive?? true,
            variants: {
                create: SIZES.map(size=>({
                size:size,
                color:color,
                stockCount: stockCount,
                }))
            }
        },
        include:{
            variants:true
        }
    });

    res.status(201).json({
        message: "Product created successfully",
        product: newProduct
    });
    
}catch(error){
    console.error("failed to create product");
    res.status(500).json({error: "Failed to create product"})
}
    
}