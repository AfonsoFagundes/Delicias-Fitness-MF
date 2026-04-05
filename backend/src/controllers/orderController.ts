import { Request, Response, NextFunction } from "express";
import * as orderService from "../services/orderService";
import { AppError } from "../errors/AppError";


export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newOrder = await orderService.createOrder({
        ...req.body,
        deliveryDate: new Date(req.body.deliveryDate)
});
        return res.status(201).json(newOrder);
    } catch (error) {
        next(error)
    }
}

export const orderListByDate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const date = req.query.date as string;

        // Se existir a data na URL (?date=2026-03-23)
        if (date && date.trim() !== "") {
            const listAllOrdersByDate = await orderService.listOrdersByDate(date);
            return res.json(listAllOrdersByDate);
        } 
        
        // SE NÃO VIER DATA (Quando clica no botão "Ver Todos")
        // Você precisa ter essa função 'listAllActiveOrders' no seu service!
        const allActiveOrders = await orderService.listAllOrders();
        return res.json(allActiveOrders);

    } catch (error) {
        next(error);
    }
}



export const getOrderSummary = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.query.date as string;
console.log(req.query)
    if (!data) {
      throw new AppError("Data não informada", 400);
    }

    console.log(req.query);

    const summaryList = await orderService.getOrderSummary(data);

    return res.json(summaryList);
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orderId = Number(req.params.id);
        const { status } = req.body;

        const order = await orderService.updateOrderStatus(orderId, status);

        return res.json(order);
    } catch (error) {
        next(error);
    }
};

export const markAllAsDelivered = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const data = req.query.date as string;

        if (!data) {
            throw new AppError("Data não informada", 400);
        }

        const result = await orderService.markAllAsDelivered(data);

        return res.json(result);

    } catch (error) {
        next(error);
    }
};