import { Request, Response, NextFunction } from "express";
//import { deleteUserById } from "../services/userService";
import * as admServices from "../services/userService";

export async function deleteUser(req: Request, res: Response) {
  const userIdToDelete = Number(req.params.userId);

  if (isNaN(userIdToDelete)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  await admServices.deleteUserById(userIdToDelete);

  return res.status(204).send();
}

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, email } = req.body;

  if (isNaN(Number(id))) {
  return res.status(400).json({ error: "ID inválido fornecido na URL" });
}

  // ID convertido para numero, prisma reconhece
  const updatedUser = await admServices.updateUserById(Number(id), { username, email });

  return res.status(200).json(updatedUser);
};

export async function listAdmins(req: Request, res: Response) {
  const admins = await admServices.getAllAdmins();
  return res.json(admins);
}

// No Controller
export async function getAdminById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const admin = await admServices.getUserById(Number(id));

    if (!admin) {
      return res.status(404).json({ message: "Admin não encontrado" });
    }

    return res.json(admin);
  } catch (error) {
    next(error); 
  }
}

