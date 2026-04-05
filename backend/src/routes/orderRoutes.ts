import { Router } from "express";
import { auth } from "../middlewares/authMiddleware";
import { admOnly } from "../middlewares/admMiddleware";
import validateIdMiddleware from "../middlewares/validateIdMiddleware"
import * as orderController from "../controllers/orderController";

const router = Router(); 


/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Criar um novo pedido
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             customerName: "Afonso Fagundes"
 *             phone: "11999999999"
 *             address: "Rua das Flores 123"
 *             note: "Sem cebola"
 *             status: "PENDING"
 *             deliveryDate: "2026-03-11T12:00:00.000Z"
 *             items:
 *               - foodId: 7
 *                 quantity: 2
 *               - foodId: 8
 *                 quantity: 1
 *     responses:
 *       200:
 *         description: Pedido criado com sucesso
 */
router.post(
    "/", 
    orderController.createOrder
)
/**
 * @swagger
 * /order:
 *   get:
 *     summary: Listar pedidos por data ou lista todos
 *     tags: [Orders]
 *     parameters:
 *       - in: query
 *         name: data
 *         required: true
 *         schema:
 *           type: string
 *         example: "11/03/2026"
 *         description: Data para buscar os pedidos
 *     responses:
 *       200:
 *         description: Lista de pedidos retornada com sucesso
 *       404:
 *         description: Nenhum pedido encontrado
 */
router.get(
    "/", 
    orderController.orderListByDate
)

/**
 * @swagger
 * /orders/summary:
 *   get:
 *     summary: Obter resumo de pedidos por data
 *     description: Retorna um resumo dos pedidos de uma data específica, incluindo total de pedidos e faturamento
 *     tags: [Orders]
 *     parameters:
 *       - in: query
 *         name: data
 *         required: true
 *         schema:
 *           type: string
 *         example: "11/03/2026"
 *         description: Data utilizada para gerar o resumo dos pedidos
 *     responses:
 *       200:
 *         description: Resumo dos pedidos retornado com sucesso
 *       400:
 *         description: Data não informada
 *       404:
 *         description: Nenhum pedido encontrado
 */
router.get(
    "/:summary", 
    orderController.getOrderSummary
)

router.patch(
  "/:id/status",
  validateIdMiddleware,
  orderController.updateOrderStatus
);

router.patch(
  "/:mark-delivered",
  orderController.markAllAsDelivered
);

export default router;