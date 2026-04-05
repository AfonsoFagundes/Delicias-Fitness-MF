import { PrismaClient } from "../generated/client";
import { AppError } from "../errors/AppError";

const prisma = new PrismaClient();

export interface FoodData {
    name: string;
    price: number;
    costPrice?: number; 
    description?: string;
    imageUrl?: string;
    categoryId: number;
}

// Tipo para deleção flexível
export type FoodDeleteRequest = Partial<Pick<FoodData, 'name'> & { id: number }>;

export async function createFood(foodData: FoodData) {
    try {
        const food = await prisma.food.create({
            data: {
                name: foodData.name,
                price: foodData.price,
                costPrice: foodData.costPrice || 0,
                description: foodData.description,
                imageUrl: foodData.imageUrl || undefined,
                category: {
                    connect: { id: foodData.categoryId }
                },
                isActive: true,
            },
            select: { id: true, name: true, price: true, description: true }
        });
        return food;
    } catch (error: any) {
        if (error.code === 'P2002') {
            throw new AppError("Já existe uma marmita cadastrada com este nome.", 409);
        }
        throw error; 
    }
}
export async function getFoodById(id: number) {
    const food = await prisma.food.findUnique({
        where: { id },
        select: { id: true, name: true, price: true, description: true }
    });

    if (!food) throw new AppError("Marmita não encontrada", 404);
    return food;
}

export async function getFoodsByCategory(categoryId: number) {
    const foods = await prisma.food.findMany({
        where: { categoryId, deletedAt: null },
        select: { id: true, name: true, price: true, categoryId: true, description: true }
    });

    if (foods.length === 0) throw new AppError("Nenhuma marmita encontrada nesta categoria", 404);
    return foods;
}

export async function deleteFood(data: FoodDeleteRequest) {
    try {
        if (data.id) {
            return await prisma.food.update({
                 where: { id: data.id}, 
                 data: {deletedAt: new Date() }
                });
        }
        if (data.name) {
            return await prisma.food.update({
                where: { name: data.name}, 
                 data: {deletedAt: new Date() }
            });
        }
        throw new AppError("Informe o ID ou o Nome para deletar", 400);
    } catch (error: any) {

        if (error.code === 'P2025') throw new AppError("Marmita não encontrada para deleção", 404);
        throw error;
    }
}

export async function restoreFood(id: number){
    try {
        return await prisma.food.update({
            where: {id: id}, 
            data: {deletedAt: null}
        })
    } catch (error: any) {
        if(error.code === 'P2002') throw new AppError ("Marmita não encontrada para resturação", 404)
        
    }
}

export type FoodUpdateRequest = Partial<FoodData> & { id: number };

export async function updateFood(data:FoodUpdateRequest) {
    try {
        if(data.id) {
            const {id, ...rest} = data
            return await prisma.food.update({ 
                where: {id: data.id},
                 data: rest
                 });
        }
        
    } catch (error: any) {
        if (error.code === 'P2002') throw new AppError("Marmita não encontrada para atualização", 404);
        throw error;
        
    }
}