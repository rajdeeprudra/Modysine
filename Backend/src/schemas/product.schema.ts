// src/schemas/product.schema.ts
import { string, z } from 'zod';

export const productSchema = z.object({
    body: z.object({
        name : string().min(3)
    })
})