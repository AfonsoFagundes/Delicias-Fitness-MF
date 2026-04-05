import { Router } from "express";
import { auth } from "../middlewares/authMiddleware";
import { admOnly } from "../middlewares/admMiddleware";
import validateIdMiddleware from "../middlewares/validateIdMiddleware"
import * as foodService from "../controllers/foodController";
import * as categoryService from "../controllers/categoryController";



const router = Router(); 

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Criar uma categoria
 *     description: Cria uma nova categoria no sistema
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *         description: ID da categoria
 *     responses:
 *       200:
 *         description: Categoria criada com sucesso
 */
router.post(
    "/",
    auth, 
    admOnly,
    categoryService.createCategory
);

/**
 * @swagger
 * /category/{categoryId}/food:
 *   post:
 *     summary: Criar uma marmita
 *     description: Cria uma nova marmita dentro de uma categoria
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
 *         description: Marmita criada com sucesso
 */
router.post(
    "/:categoryId/food",
    validateIdMiddleware,
    auth, 
    admOnly,
    foodService.createFood
);

/**
 * @swagger
 * /category:
 *   get:
 *     summary: Listar todas as categorias
 *     description: Retorna todas as categorias cadastradas
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: Todas as categorias listadas com sucesso
 */
router.get(
    "/",
    categoryService.getAllCategories
);

/**
 * @swagger
 * /category/{id}:
 *   get:
 *     summary: Listar uma categoria
 *     description: Retorna uma categoria específica pelo ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *         description: ID da categoria
 *     responses:
 *       200:
 *         description: Categoria listada com sucesso
 */
router.get(
    "/:id",
    validateIdMiddleware,
    categoryService.getCategoryById
);

/**
 * @swagger
 * /category/{id}:
 *   get:
 *     summary: Listar uma categoria
 *     description: Retorna uma lista de categorias para o Select 
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *         description: ID da categoria
 *     responses:
 *       200:
 *         description: Categoria listada com sucesso
 */
router.get(
    "/:id", 
    validateIdMiddleware, 
    categoryService.listCategoriesSimple
)

/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     summary: Desativar categoria (Soft Delete)
 *     description: Marca a categoria como inativa sem removê-la do banco
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *         description: ID da categoria
 *     responses:
 *       200:
 *         description: Categoria desativada com sucesso
 */
router.delete(
    "/:id", 
    validateIdMiddleware, 
    categoryService.updateCategory
);

/**
 * @swagger
 * /category/{id}/restore:
 *   patch:
 *     summary: Restaurar categoria
 *     description: Restaura uma categoria que foi desativada
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 2
 *         description: ID da categoria
 *     responses:
 *       200:
 *         description: Categoria restaurada com sucesso
 */
router.patch(
    "/:id/restore",
    validateIdMiddleware,
    categoryService.restoreCategory
);
export default router;