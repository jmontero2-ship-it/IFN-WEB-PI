import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import f11Routes from "./src/routes/f11Localizacion.routes.js";
import { pool } from "./src/db/connection.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", f11Routes);

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
