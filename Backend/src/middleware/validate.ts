import type{ Request, Response, NextFunction, RequestHandler } from 'express';
import type{ ZodSchema } from 'zod'; // Import the specific Zod type

export const validate = (schema: ZodSchema): RequestHandler => {
  return async (req:Request, res:Response, next:NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next(); 
    } catch (error) {
      res.status(400).json(error);
    }
  };
};