import api from "./api"
//import type { Order } from "@/Types/Order"

export const createOrder = async (orderData: any) => {
  const response = await api.post("/order", orderData);
  return response.data;
  
}

export const getOrders = async (data?: string) => {
  const config = data ? { params: { date: data } } : {};
 
  const response = await api.get("/order", config);
   console.log("Respota completa:", response.data[0])
  return response.data;
};

//(orderData: Omit<Order, "id" | "createdAt">) 

export const updateOrderStatus = async(id: number, newStatus: string ) => {
  const response = await api.patch(`order/${id}/status`)
  console.log("Status:", response.data, newStatus)
  return response.data
}