import type{ Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extend the Express Request type so TypeScript knows we are adding user data
export interface AuthRequest extends Request {
  user?: { userId: string; role: string };
}

export const requireAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  // 1. Grab the HTTP-Only cookie that was set when you logged in with OTP
  const token = req.cookies.token; 

  // 2. If there is no cookie, kick them out
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    // 3. Verify the token using your secret key from the .env file
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string; role: string };
    
    // 4. Attach the decoded user data to the request
    req.user = decoded; 
    
    // 5. Success! Pass control to the next function (the Cloudinary upload controller)
    next(); 
  } catch (error) {
    res.status(401).json({ error: "Unauthorized: Invalid or expired token" });
  }
};