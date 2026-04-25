// src/schemas/product.schema.ts
import { z } from 'zod';

export const productSchema = z.object({
    body:z.object({
        name : z.string("name is required")
                      .trim()
                      .min(6)
                      .regex(/^[a-zA-Z\s]+$/, "Name can only contain Letters and speaces")
                      //REFINE: Custom logic to block repeating spam characters like "cccccc"
                      .refine((val)=>{

                        //removing the unnecessary spaces
                        const cleanString = val.replace(/\s/g,'');

                        if(cleanString.length==0) return false;

                        const firstCharacter = cleanString[0];
                        const isAllSameCharacter = cleanString.split("").every(char=> char == firstCharacter);

                        return !isAllSameCharacter;
                      },{ message: "Please enter a valid real name for the Product!" }),

        description : z.string("description is required")
                       .trim()
                       .min(10, "description must be atleast of 10 characters")
                       .refine((val)=>{

                        //removing the unnecessary spaces
                        const cleanString = val.replace(/\s/g,'');

                        if(cleanString.length==0) return false;

                        const firstCharacter = cleanString[0];
                        const isAllSameCharacter = cleanString.split("").every(char=> char == firstCharacter);

                        return !isAllSameCharacter;
                      },{ message: "Please enter a valid real name for the Product!" }), 
        images: z.array(
                    z.url("Each Image must be a valid url")
                    ).min(1, "You must add atleast 1 image url"),

        price: z.number()
               .positive("Price must be a positive number"),
        
        isActive: z.boolean().optional(),
    })
        
        
});

// inferred type to use it in controllers
export type productInput = z.infer<typeof productSchema>['body'];