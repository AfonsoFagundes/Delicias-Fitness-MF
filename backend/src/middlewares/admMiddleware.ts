import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { } from "../controllers/authControllers";

declare global {
  namespace Express {
    interface Request {
      role?: string;
    }
  }
}

export function admOnly(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.role !== "ADMIN") {
    throw new AppError("Acesso negado", 403);
  }

  next();
}
