import { Request, Response } from "express";
import { generateToken } from "../utils/jwt";
import { PrismaClient } from "../generated/client";
import { AppError } from "../errors/AppError";
import bcrypt from "bcrypt"

export const prisma = new PrismaClient();

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError("Email e senha são obrigatórios", 400);
    }

    const user = await prisma.admin.findUnique({
      where: { email }
    });

    if (!user) {
      throw new AppError("Credenciais inválidas", 401);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Credenciais inválidas", 401);
    }

    const token = generateToken({
      userId: user.id,
      role: user.role as "ADMIN" | "USER",
    });

    return res.json({ token });

  } catch (error) {
    console.error(error);

    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        error: error.message
      });
    }

    return res.status(500).json({
      error: "Erro interno do servidor"
    });
  }
}

export async function register(req: Request, res: Response) {
  // 1. Pegue os dados do corpo da requisição
  const { email, password, username } = req.body;

  // 2. Verificação de segurança: Se o email não vier, pare aqui antes de chamar o Prisma
  if (!email) {
    throw new AppError("O campo email é obrigatório", 400);
  }

  // 3. Agora o Prisma não receberá 'undefined'
  const userExists = await prisma.admin.findUnique({ 
    where: { email: email } 
  });

  if (userExists) {
    throw new AppError("Usuário já existe", 409);
  }
 console.log("password:", password)
  const hashedPassword = await bcrypt.hash(password, 8);
  
 
  const user = await prisma.admin.create({
    data: { 
      email, 
      password: hashedPassword, 
      username: username || email.split('@')[0], // Garante o username obrigatório
      role: "ADMIN" 
    },
  });

  return res.status(201).json(user);
}