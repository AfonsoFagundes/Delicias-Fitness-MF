//Aqui você define a URL (Ex: POST /foods).

import { Router } from "express";
import { auth } from "../middlewares/authMiddleware";
import { admOnly } from "../middlewares/admMiddleware";
import validateIdMiddleware from "../middlewares/validateIdMiddleware"
import * as foodController from "../controllers/foodController";



const router = Router(); 

/**
 * @swagger
 * /food/{id}:
 *   get:
 *     summary: Listar uma marmita
 *     description: Retorna uma marmita específica pelo ID
 *     tags: [Food]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 8
 *         description: ID da marmita
 *     responses:
 *       200:
 *         description: Marmita listada com sucesso
 */
router.get(
    "/:id",
    validateIdMiddleware, 
    foodController.getFoodById
);

/**
 * @swagger
 * /food/{categoryId}/food:
 *   get:
 *     summary: Lista todas as marmitas por categoria
 *     description: Retorna todas as marmitas pertencentes a uma categoria
 *     tags: [Food]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *         description: ID da categoria
 *     responses:
 *       200:
 *         description: Marmitas listadas com sucesso
 */
router.get(
    "/:categoryId/food",
    validateIdMiddleware, 
    foodController.getFoodsByCategory
);

/**
 * @swagger
 * /food/{id}:
 *   delete:
 *     summary: Desativar uma marmita (Soft Delete)
 *     description: Marca a marmita como inativa sem remover do banco
 *     tags: [Food]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 4
 *         description: ID da marmita
 *     responses:
 *       200:
 *         description: Marmita desativada com sucesso
 */
router.delete(
    "/:id",
    validateIdMiddleware,
    auth,
    admOnly,
    foodController.deleteFood
);

/**
 * @swagger
 * /food/{id}/restore:
 *   patch:
 *     summary: Restaurar produto
 *     description: Restaura uma marmita que foi desativada
 *     tags: [Food]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *         description: ID da marmita
 *     responses:
 *       200:
 *         description: Produto restaurado com sucesso
 */
router.patch(
    "/:id/restore", 
    validateIdMiddleware, 
    foodController.restoreFood
);

/**
 * @swagger
 * /food/{id}:
 *   patch:
 *     summary: Atualizar informações da marmita
 *     description: Atualiza os dados de uma marmita existente
 *     tags: [Food]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 4
 *         description: ID da marmita
 *     responses:
 *       200:
 *         description: Informação atualizada com sucesso
 */
router.patch(
    "/:id", 
    validateIdMiddleware,
    //auth,
   // admOnly,
    foodController.updateFood
);

export default router;

