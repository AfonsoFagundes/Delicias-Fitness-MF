
// lógica do Prisma para as Categorias

import { AppError } from "../errors/AppError";
import { PrismaClient } from "../generated/client";

const prisma = new PrismaClient();

export interface CreateCategoryData {
  name: string
}
export async function createCategory(categoryData: CreateCategoryData) {
 try {
  const category = await prisma.category.create({
    data: {
      name: categoryData.name
    }, 
    select: {
     id: true, 
      name: true
    }
  })
  return category;
 } catch (error: any) {
  if(error.code === 'P2002') {
    throw new AppError("Essa categoria já existe", 400)
  }
  throw error;
 }
  
}

export async function getAllCategories() {
  const categories = await prisma.category.findMany({
    where: { deletedAt: null},
    select: {
      id: true,
      name: true,
      foods: {
        select: {
          id: true,
          name: true,
          price: true,
          description: true
        }
      }
    }
  });
      if (categories.length === 0) {
         throw new AppError("Nenhuma categoria encontrada", 404);
      }

  return categories;
}

export async function getCategoryById(id: number) {
  try {
    if(id){
      return await prisma.category.findFirst({
        where: {id: id, deletedAt: null},
      })
    }
  } catch (error: any) {
     if (error.code === 'P2002') throw new AppError("Categoria não encontrada", 404);
        throw error;
  }
    
}


export async function listCategoriesSimple(id: number) {
  try {
    return await prisma.category.findMany({
    where: {
      id: id,
      deletedAt: null
    },
    select: {
      id: true,
      name: true
    }
  });
  } catch (error: any) {
    if (error.code === 'P2002') throw new AppError("Categoria não encontrada", 404);
        throw error;
    
  }
}
 export interface UpdateCategory extends CategoryData{}

export async function updateCategory (data: UpdateCategory) {
  try {
     if (data.id) {
        const {id, ...rest} = data 
        return await prisma.category.update({
     where: {id: data.id},
     data: rest
    });
      }
    
  } catch (error) {
    if (error === 'P2002') {
      throw new AppError("Categoria não encontrada para atualização")
    }
    throw error;
  }
}

 export interface CategoryData {
  id: number, 
  name: string
}

export async function deleteCategory(categoryData: { id?: number, name?: string }) {
    try {
        
        if (categoryData.id) {
            return await prisma.category.update({ 
                where: { id: categoryData.id },
                data: { deletedAt: new Date() } 
            });
        }
        
       
        if (categoryData.name) {
            return await prisma.category.update({ 
                where: { name: categoryData.name },
                data: { deletedAt: new Date() }
            });
        }

        throw new AppError("Informe o ID ou o Nome para deletar", 400);
    } catch (error: any) {
      
        if (error.code === 'P2025') throw new AppError("Categoria não encontrada", 404);
        throw error;
    }
}
  

export async function restoreCategory(id: number) {
  try {
    return await prisma.category.update({
      where: { id: id },
      data: { deletedAt: null } 
    });
  } catch (error: any) {
    if (error.code === 'P2002') throw new AppError("Categoria não encontrada para restauração", 404);
    throw error;
  }
}
