import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import f11Routes from "./routes/f11Localizacion.routes.js";

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api", f11Routes);

// Servidor
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
