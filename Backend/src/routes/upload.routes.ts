import { Router } from "express";
import { uploadImage } from "../controllers/upload.controller";
import { uploadMiddleware } from "../middleware/uploads";
import { requireAuth } from "../middleware/auth";

const router = Router();

// "image" is the key the frontend must use when sending the form-data
router.post("/", requireAuth as any, uploadMiddleware as any , uploadImage);

export default router;