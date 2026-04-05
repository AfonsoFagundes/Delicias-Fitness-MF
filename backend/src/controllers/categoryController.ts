
import { NextFunction, Request, Response } from "express";
import * as categoryService from "../services/categoryService";


export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
       const {name} = req.body
       if (!name) {
            return res.status(400).json({ message: "O nome é obrigatório" })
        }
        const newCategory = await categoryService.createCategory({name})
        return res.json(newCategory)
    } catch (error) {
        next(error);
    }
}

export const getAllCategories = async (req: Request, res: Response, next:NextFunction) => {
      try {
            const categories = await categoryService.getAllCategories()
            
            return res.json(categories);
        } catch (error) {
            next(error);
        }
}

export const getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
       try {
            const id = (Number(req.params.id));
            const category = await categoryService.getCategoryById(id);
            return res.json(category);
        } catch (error) {
            next(error);
        }
    };

    export const listCategoriesSimple = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = (Number(req.params.id))
            const category = await categoryService.listCategoriesSimple(id)
            return res.json(category)
        } catch (error) {
            next(error)
            
        }
    };

    export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = Number(req.params.id); 
             const updateData = req.body;

            const data = {
                id, ...updateData
             }
             const updateCategory = await categoryService.updateCategory(data)
             return res.json(updateCategory)
        } catch (error) {
            next(error) 
        }
    }

     export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
         try {
             const id = Number(req.params.id);
             const name = req.query.name as string
            
             await categoryService.deleteCategory({ 
                id: id > 0 ? id : undefined, 
                name 
           });
            return res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

    export const restoreCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const category = await categoryService.restoreCategory(id);
    return res.json(category); 
  } catch (error) {
    next(error);
  }
};




