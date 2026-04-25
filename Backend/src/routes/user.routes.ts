import { Router } from "express";
import { createUser } from "../controllers/user.controller";
import { validate } from "../middleware/validate";
import { userSchema } from "../schemas/user.schema";

const router = Router();

router.post("/", validate(userSchema) as any, createUser);


export default router;