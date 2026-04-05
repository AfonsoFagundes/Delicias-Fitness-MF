import api from "./api"

export const logar = async (email: string, password: string) => {
  const response = await api.post("/auth/login", {
    email,
    password
  })

  return response.data
}