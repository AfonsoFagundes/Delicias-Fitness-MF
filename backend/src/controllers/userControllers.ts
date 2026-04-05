import { Request, Response } from "express";
import * as admServices from "../services/userService";

export async function getProfile(req: Request, res: Response) {
  const userId = req.userId!;

  const user = await admServices.getUserById(userId);

  return res.json(user);
}
