import { Navigate } from "react-router-dom";
import { useAuth } from "../components/Context/AuthContext";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { authenticated } = useAuth();

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
