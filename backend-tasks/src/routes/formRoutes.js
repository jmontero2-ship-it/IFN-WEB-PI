const express = require('express');
const router = express.Router();
const pool = require('../src/db'); // conexión a PostgreSQL

// Endpoint para guardar los datos de F11 - Localización
router.post('/f11', async (req, res) => {
  try {
    const { id_conglomerado, diligenciado_por, fecha, coordenadas, observaciones } = req.body;

    const result = await pool.query(
      `INSERT INTO f11_localizacion (id_conglomerado, diligenciado_por, fecha, coordenadas, observaciones)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [id_conglomerado, diligenciado_por, fecha, coordenadas, observaciones]
    );

    res.status(201).json({ message: "Formulario F11 guardado exitosamente", data: result.rows[0] });
  } catch (error) {
    console.error("Error al guardar el formulario F11:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
