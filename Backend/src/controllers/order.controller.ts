import type { Request, Response } from "express";
import { prisma }  from '../../db'

//const prisma = new PrismaClient();

export const createOrder = async(req:Request, res:Response)=>{
    try{
        const {items, customerDetails} = req.body;

        if(!items || items.length===0){
            return res.status(400).json({ error: "Your cart is empty" });
        }

        if (!customerDetails || !customerDetails.email) {
         return res.status(400).json({ error: "Customer email is required" });
        }

        let user = await prisma.user.findUnique({
            where: {email:customerDetails.email},
        });

        if(!user){
            user = await prisma.user.create({
                data:{
                    name:customerDetails.name,
                    email:customerDetails.email,
                    phoneNo:customerDetails.phoneNo,
                    address:customerDetails.address,
                    city:customerDetails.city,
                    zipcode:customerDetails.zipcode,   
                },
            });
        }

        let calculatedTotal = 0;
        const orderItemsFromDatabase = [];

        for (const item of items) {
        const variant = await prisma.productVariant.findUnique({
        where: { id: item.variantId },
        include: { product: true },
        });

        if (!variant) {
        return res.status(404).json({ error: `Item variant not found.` });
        }

        if (variant.stockCount < item.quantity) {
        return res.status(400).json({ error: `Not enough stock for ${variant.product.name}` });
        }

        const realPrice = variant.product.price;
        calculatedTotal += realPrice * item.quantity;

        orderItemsFromDatabase.push({
        variantId: variant.id,
        quantity: item.quantity,
        priceAtPurchase: realPrice, 
        });
        }

        const newOrder = await prisma.order.create({
        data: {
        userId: user.id, // We use the ID from our Find/Create step!
        totalAmount: calculatedTotal,
        shippingAddress: customerDetails, // Save the specific address for this order
        orderItems: {
          create: orderItemsFromDatabase,
        },
        },
        include: {
            orderItems: true,
        },
        });

        res.status(201).json({
        message: "Order created successfully. Ready for payment.",
        order: newOrder,
        });


    }catch(error){
        console.log("Order Creation error: ", error);
        res.status(500).json({error:"Failed to create order"});

    }
}