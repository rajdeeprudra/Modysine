import "dotenv/config"; // 👈 THIS fixes the "password must be a string" crash!
import { PrismaClient } from "./generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Now we are 100% sure process.env.DATABASE_URL is not undefined
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

export const prisma = new PrismaClient({
  adapter,
});