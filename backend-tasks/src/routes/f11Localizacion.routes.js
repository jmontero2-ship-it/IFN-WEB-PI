import express from "express";
import { pool } from "../db/connection.js";

const router = express.Router();

router.post("/f11", async (req, res) => {
  try {
    const {
      conglomerado,
      diligenciado_por,
      entidad_responsable,
      fecha
    } = req.body;

    const query = `
      INSERT INTO f11_localizacion (conglomerado, diligenciado_por, entidad_responsable, fecha)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;

    const result = await pool.query(query, [
      conglomerado,
      diligenciado_por,
      entidad_responsable,
      fecha,
    ]);

    await pool.query(`INSERT INTO formularios_estado (codigo_conglomerado, codigo_brigada, formulario)
   VALUES ($1, $2, 'F11')`,
   [conglomerado, "BRG-01"]);

    res.json({
      success: true,
      message: "Formulario F1.1 guardado exitosamente",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("❌ Error al guardar F1.1:", error.message);
    res.status(500).json({ success: false, message: "Error interno del servidor" });
  }
});




export default router;
