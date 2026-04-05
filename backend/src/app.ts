import 'dotenv/config';
import express from "express";
import cors from "cors"
import admRoutes from "./routes/admRoutes";
import authRouter from "./routes/authRouter";
import foodRoutes from "./routes/foodRoutes";
import errorMiddleware from "./middlewares/errorMiddleware"
import categoryRoutes from "./routes/categoryRoutes"
import orderRoutes from "./routes/orderRoutes"

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger";
const app = express();

app.use(cors({
  origin: "http://localhost:5173" // ← 2. adiciona aqui, antes de tudo!
}))

app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});
app.use("/auth", authRouter);
app.use("/admin", admRoutes);
app.use("/food", foodRoutes);
app.use("/category", categoryRoutes);
app.use("/order", orderRoutes);








app.use(errorMiddleware);


export default app;