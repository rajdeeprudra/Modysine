import  type {Request,Response}  from 'express'
import { prisma }  from '../../db'


//get products

export const getAllTheProducts = async (req:Request,res:Response) => {
    try{

        const products = await prisma.product.findMany({
            where: {
                isActive:true
            },
            include: {
                variants:true
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