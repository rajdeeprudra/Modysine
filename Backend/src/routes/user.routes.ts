import { Router } from "express";
import { createUser,loginUser,requestLoginOtp,verifyLoginOtp } from "../controllers/user.controller";
import { validate } from "../middleware/validate";
import { userSchema,loginUserSchema } from "../schemas/user.schema";

const router = Router();

//email and password based Login
router.post("/", validate(userSchema) as any, createUser);
router.post("/login", validate(loginUserSchema) as any, loginUser);

//otp based login
router.post("/login/otp/request", requestLoginOtp);
router.post("/login/otp/verify", verifyLoginOtp);


export default router;