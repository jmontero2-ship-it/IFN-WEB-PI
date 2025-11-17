import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { initDB } from './db.js';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

router.post('/register', async (req, res) => {
  const db = await initDB();
  const { username, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  await db.run('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, hashed, role]);
  res.json({ message: 'Usuario creado correctamente' });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT id, nombre, email, rol FROM usuarios WHERE email = $1 AND password = $2",
      [email, password]
    );

    if (result.rows.length === 0) {
      return res.json({ success: false, message: "Credenciales incorrectas" });
    }

    const user = result.rows[0];

    res.json({
      success: true,
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol,  // <— ESTO ES LO IMPORTANTE
      }
    });

  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ success: false, message: "Error del servidor" });
  }
});

export default router;
