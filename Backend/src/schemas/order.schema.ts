import { z } from "zod";
import { baseUserFields } from "./user.schema";

export const createOrderSchema = z.object({
  body: z.object({
    items: z.array(
      z.object({
        variantId: z.string().uuid("Invalid Variant ID format"),
        quantity: z.number().int().positive("Quantity must be at least 1"),
      })
    ).min(1, "Your cart cannot be empty"),
    
    // We recycle the base fields, but throw away password and role for guests!
    customerDetails: baseUserFields.omit({ 
        password: true, 
        role: true 
    }),
  }),
});