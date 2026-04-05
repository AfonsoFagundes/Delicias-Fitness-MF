import { Request, Response, NextFunction } from "express";
import * as foodServices from "../services/foodService";

export const createFood = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categoryId = Number(req.params.categoryId);
        const newFood = await foodServices.createFood({ categoryId, ...req.body });
        return res.status(201).json(newFood);
    } catch (error) {
        next(error);
    }
};

export const getFoodById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const food = (Number(req.params.id));
        const foodId =await foodServices.getFoodById(food)
        return res.json(foodId);
    } catch (error) {
        next(error);
    }
};

export const getFoodsByCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
       const foodsId = await foodServices.getFoodsByCategory(req.body)
        return res.json(foodsId);
    } catch (error) {
        next(error);
    }
};

export const deleteFood = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const name = req.query.name as string;
        
        await foodServices.deleteFood({ 
            id: id > 0 ? id : undefined, 
            name 
        });

        return res.status(204).send();
    } catch (error) {
        next(error);
    }
};

export const restoreFood = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const foodId = await foodServices.restoreFood(id)
        return res.json(foodId)
    } catch (error) {
        next(error);     
    }
}

export const updateFood = async (req: Request, res: Response, next: NextFunction) => {
   try {
    
    const id = Number(req.params.id); 
    
    const updateData = req.body; 
    const data = {
        id, ...updateData
    }

    const updatedFood = await foodServices.updateFood(data);
    
    return res.json(updatedFood);
   } catch (error) {
    next(error);
   }
}