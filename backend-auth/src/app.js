import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pkg from "pg";

dotenv.config();

const { Pool } = pkg;
const app = express();

app.use(cors());
app.use(express.json());

// ✅ Conexión a PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "ifn_db",
  password: process.env.DB_PASSWORD || "1302",
  port: process.env.DB_PORT || 5432,
});

// 🧩 IMPORTA AQUÍ LAS RUTAS DEL F11
import f11Routes from "../../backend-tasks/src/routes/f11Localizacion.routes.js";

// Usa las rutas
app.use("/api", f11Routes);

// 🔐 Ruta de login
app.post("/api/login", async (req, res) => {
  const { codigo_conglomerado, codigo_brigada, password } = req.body;

  try {
    const result = await pool.query(
      `SELECT 
        codigo_conglomerado,
        codigo_brigada,
        contrasena,
        rol
       FROM usuarios 
       WHERE codigo_conglomerado = $1 
       AND codigo_brigada = $2 
       AND contrasena = $3`,
      [codigo_conglomerado, codigo_brigada, password]
    );

    if (result.rows.length === 0) {
      return res.json({
        success: false,
        message: "Credenciales incorrectas",
      });
    }

    const user = result.rows[0];

    return res.json({
      success: true,
      user: {
        codigo_conglomerado: user.codigo_conglomerado,
        codigo_brigada: user.codigo_brigada,
        rol: user.rol,  // 👈 YA ESTÁ BIEN
      },
    });

  } catch (err) {
    console.error("❌ Error en login:", err.message);
    return res.status(500).json({
      success: false,
      message: "Error interno del servidor",
    });
  }
});


// 🖥️ Puerto del servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Auth-Service corriendo en puerto ${PORT}`));
