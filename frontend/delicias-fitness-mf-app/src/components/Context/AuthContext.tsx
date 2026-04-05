import { createContext, useContext, useState, useEffect } from "react";

import { logar } from "@/Api/LoginApi";

interface User {
  email: string;
}

interface AuthContextType {
  user: User | null;
  authenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  authenticated: false,
  login: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState<User | null>(null);
  const [authenticated, setAuthenticated] = useState(!!token);

  // LOGIN
  const login = async (email: string, password: string) => {
    try {
      const response = await logar(email, password);

      const token = response.token;

      localStorage.setItem("token", token);

      setUser({ email });
      setAuthenticated(true);
    } catch (error) {
      throw error;
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setAuthenticated(false);
  };

  // PERSISTÊNCIA DE LOGIN
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setAuthenticated(true);
      setUser({ email: "persisted-user" });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
