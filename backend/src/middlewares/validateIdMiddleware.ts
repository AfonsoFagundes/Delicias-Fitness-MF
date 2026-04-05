import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";



  export default function validateIdMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        
        const idValue = Object.values(req.params)[0]; 
        const parsedId = Number(idValue);

        if (isNaN(parsedId) || parsedId <= 0) {
            throw new AppError("O id fornecido na URL é inválido", 400);
        }
        next();
    } catch (error) {
        next(error); 
    }
}