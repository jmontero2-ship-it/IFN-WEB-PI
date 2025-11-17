import express from "express";
import { pool } from "../db/connection.js";

const router = express.Router();

/**
 * Obtiene los formularios completados
 */
router.get("/formularios-estado/:conglomerado", async (req, res) => {
  try {
    const { conglomerado } = req.params;

    const result = await pool.query(
      `SELECT * FROM formularios_estado 
       WHERE codigo_conglomerado = $1
       ORDER BY fecha DESC`,
      [conglomerado]
    );

    res.json({ success: true, data: result.rows });

  } catch (error) {
    console.error("❌ Error consultando formularios:", error);
    res.status(500).json({ success: false, message: "Error del servidor" });
  }
});

export default router;
