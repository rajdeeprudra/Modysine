import { Router } from "express";
import { validate } from "../middleware/validate";
import { createOrderSchema } from "../schemas/order.schema";
import { createOrder } from "../controllers/order.controller";

const router = Router();

router.post("/", validate(createOrderSchema), createOrder);

export default router;

