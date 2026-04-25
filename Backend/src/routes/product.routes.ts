import { Router } from "express";
import { createProduct, getAllTheProducts, getOneProduct } from "../controllers/product.controllers";
import { validate } from "../middleware/validate";
import { getProductParamsSchema, productSchema } from "../schemas/product.schema";

const router = Router();

router.get("/", getAllTheProducts);
router.get("/:id", validate(getProductParamsSchema),getOneProduct);
router.post("/", validate(productSchema) as any,createProduct);

export default router;
