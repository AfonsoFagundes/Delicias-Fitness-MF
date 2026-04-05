import { Router } from "express";
import { auth } from "../middlewares/authMiddleware";
import { admOnly } from "../middlewares/admMiddleware";
import { login, register } from "../controllers/authControllers";

const router = Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Logar e gerar um token de acesso JWT
 *     description: Autentica o usuário no sistema e retorna um token JWT para acesso às rotas protegidas
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: novoadm@email.com
 *               password:
 *                 type: string
 *                 example: 123456
 *           example:
 *             email: novoadm@email.com
 *             password: 123456
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Credenciais inválidas
 */
router.post("/login",
    login
);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Criar uma conta no sistema
 *     description: Cria um novo usuário para acessar o sistema
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - username
 *             properties:
 *               email:
 *                 type: string
 *                 example: novoadm@email.com
 *               password:
 *                 type: string
 *                 example: 123456
 *               username:
 *                 type: string
 *                 example: admin
 *           example:
 *             email: novoadm@email.com
 *             password: 123456
 *             username: admin
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 */
router.post("/register", register);

export default router; 


