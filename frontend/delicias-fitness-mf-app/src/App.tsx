import { Routes, Route } from "react-router-dom";

import ProtectedAdm from "./routes/ProtectedAdm";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Register  from "./pages/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route
        path="/admin"
        element={
          <ProtectedAdm>
            <Admin />
          </ProtectedAdm>
        }
      />

      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
