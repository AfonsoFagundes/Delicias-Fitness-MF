import cors from "cors"
import app from "./app";
const port = 3000;

app.use(cors({
  origin: "http://localhost:5173" 
}))

app.get('/', (req, res) => {
  res.send('🚀 Backend do CRM de Marmitas está online!');
});

app.listen(port, "0.0.0.0", () => { 
  console.log(`🚀 Server running at http://localhost:${port}`);
});