import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { AppError } from "../errors/AppError";

export function auth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token não enviado", 401);
  }

  const [, token] = authHeader.split(" ");

  const decoded = verifyToken(token);

  req.userId = decoded.userId;
  req.role = decoded.role;

  next();
}
