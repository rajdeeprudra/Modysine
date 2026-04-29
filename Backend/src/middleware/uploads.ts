import multer from "multer";
import  type { Request, Response, NextFunction } from "express";

const storage = multer.memoryStorage();


const uploadConfig = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
});

// Create a wrapper middleware to catch the specific size error
export const uploadMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const uploadSingle = uploadConfig.single("image");

  uploadSingle(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // Catch the specific size limit error
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ 
          error: "Image is too large. Please upload an image smaller than 5MB." 
        });
      }
      // Catch any other Multer errors
      return res.status(400).json({ error: err.message });
    } else if (err) {
      // Catch standard unknown errors
      return res.status(500).json({ error: "An unknown error occurred during image upload." });
    }
    
    // If there are no errors, move on to the uploadImage controller!
    next();
  });
};