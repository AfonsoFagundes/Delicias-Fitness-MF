import api from "./api"

export const register = async (email: string, password: string) => {

  const response = await api.post("/auth/register", {
    email,
    password
  })

  return response.data
}

export default register