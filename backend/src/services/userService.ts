import { PrismaClient } from "../generated/client";
import { AppError } from "../errors/AppError"
import bcrypt from "bcrypt";

const prisma = new PrismaClient();


export async function getUserById(userId: number) {
  const user = await prisma.admin.findUnique({
    where: { id: userId },
    select: {
      id: true,
      username: true,
      email: true,
      createdAt: true,
    },
  });

  if (!user) {
    throw new AppError("Usuário não encontrado", 404);
  }

  return user;
}

export async function deleteUserById(userId: number): Promise<void> {
  const userExists = await prisma.admin.findUnique({
    where: { id: userId },
  });

  if (!userExists) {
    throw new AppError("Usuário não encontrado", 404);
  }

  await prisma.admin.delete({
    where: { id: userId },
  });
}


export async function updateUserById(userId: number, data: { username?: string; email?: string; password?: string; }) {
  const userExists = await prisma.admin.findUnique({
    where: { id: userId },
  });

  if (!userExists) {
    throw new AppError("Usuário não encontrado", 404);
  }

  if(data.password) {
    data.password = await bcrypt.hash(data.password, 10)

  }

  const updatedUser = await prisma.admin.update({
    where: { id: userId },
    data: data,
    select: {
      id: true,
      username: true,
      email: true,
      createdAt: true,
    },
  });

  return updatedUser;
}


  // Buscar todos
  export async function getAllAdmins() {
    return await prisma.admin.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
      },
    });
  }
;