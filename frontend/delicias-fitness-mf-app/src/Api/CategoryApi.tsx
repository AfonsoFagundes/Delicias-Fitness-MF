import api from "./api"

export const getCategories = async () => {
  const response = await api.get("/category")
  return response.data
}

export const listCategoriesSimple = async () => {
  const response = await api.get("/category")
  console.log("Lista de cateogiras selec:t", response.data)
  return response.data
}

export const createCategory = async (name: string) => {
  const response = await api.post("/category", {name})
  console.log("Category criada:", response.data)
  return response.data
}