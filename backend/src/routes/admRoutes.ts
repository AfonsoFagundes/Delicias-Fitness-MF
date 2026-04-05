import { Router } from "express";
import { auth } from "../middlewares/authMiddleware";
import { admOnly } from "../middlewares/admMiddleware";
import * as admController from "../controllers/admControllers";


const router = Router();

/**
 * @swagger
 * /admin/{userId}:
 *   delete:
 *     summary: Deletar um Admin/Usuário
 *     description: Remove um usuário ou administrador do sistema
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 */
router.delete(
  "/:userId",
  auth,
  admOnly,
  admController.deleteUser
);

/**
 * @swagger
 * /admin/users/{id}:
 *   patch:
 *     summary: Atualizar as informações do Admin/Usuário
 *     description: Atualiza os dados de um usuário ou administrador
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Informações atualizadas com sucesso
 */
router.patch(
  "/users/:id", 
  auth, 
  admOnly,
  admController.updateUser
);

/**
 * @swagger
 * /admin:
 *   get:
 *     summary: Listar todos os Admins/Usuários
 *     description: Retorna todos os usuários e administradores cadastrados
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Todos os usuários listados com sucesso
 */
router.get(
  "/",
  admController.listAdmins
); 

/**
 * @swagger
 * /admin/{id}:
 *   get:
 *     summary: Listar apenas um Admin/Usuário
 *     description: Retorna um usuário específico pelo ID
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 4
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário listado com sucesso
 */
router.get(
  "/:id",
  admController.getAdminById
);

export default router;
