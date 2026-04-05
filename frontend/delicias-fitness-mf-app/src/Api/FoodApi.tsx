import api from "./api"
import type { Food } from "@/Types/Food"

export const getFoodsByCategory = async (categoryId: number) => {
  const response = await api.get(`/food/${categoryId}/food`)
  console.log(response.data)
  return response.data
}

export const createProduct = async (categoryId: number, productData: Omit<Food, 'id'>) => {
    const response = await api.post(`/category/${categoryId}/food`, productData); 
    console.log("POST com Sucesso:", response.data);
    return response.data; 
}

export const deleteProduct = async ( id: number) => {
    const response = await api.delete(`/food/${id}`)
    console.log("DELETE", id)
    return response.data
}

export const updateProduct = async (id: number) => {
    const response = await api.patch(`/food${id}`)
    console.log(response.data)
    return response.data
}