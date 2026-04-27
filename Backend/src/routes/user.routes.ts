import { Router } from "express";
import { createUser,loginUser } from "../controllers/user.controller";
import { validate } from "../middleware/validate";
import { userSchema,loginUserSchema } from "../schemas/user.schema";

const router = Router();

router.post("/", validate(userSchema) as any, createUser);
router.post("/login", validate(loginUserSchema) as any, loginUser);

export default router;