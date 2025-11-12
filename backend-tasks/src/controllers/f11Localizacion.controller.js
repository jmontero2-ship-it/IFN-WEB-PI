import { pool } from '../db/connection.js';

export const guardarF11Localizacion = async (req, res) => {
  try {
    const form = req.body;

    const query = `
      INSERT INTO f11_localizacion (
        codigo_conglomerado, diligenciado_por, entidad_responsable, fecha_formulario,
        jefe_brigada, botanico, tecnicos_auxiliares, coinvestigadores,
        fecha_inicio, fecha_final, region, departamento, municipio, caserio,
        vereda, corregimiento, resguardo_indigena, consejo_comunitario, rancheria,
        corporacion_autonoma, inspeccion_policia, otro, nombre_contacto, telefono_contacto,
        latitud, longitud, altitud, observaciones, verificado_por
      ) VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29
      ) RETURNING id
    `;

    const values = [
      form.codigo_conglomerado,
      form.diligenciado_por,
      form.entidad_responsable,
      form.fecha_formulario,
      form.jefe_brigada,
      form.botanico,
      form.tecnicos_auxiliares,
      form.coinvestigadores,
      form.fecha_inicio,
      form.fecha_final,
      form.region,
      form.departamento,
      form.municipio,
      form.caserio,
      form.vereda,
      form.corregimiento,
      form.resguardo_indigena,
      form.consejo_comunitario,
      form.rancheria,
      form.corporacion_autonoma,
      form.inspeccion_policia,
      form.otro,
      form.nombre_contacto,
      form.telefono_contacto,
      form.latitud,
      form.longitud,
      form.altitud,
      form.observaciones,
      form.verificado_por
    ];

    const result = await pool.query(query, values);
    res.status(201).json({ message: "✅ Formulario F1.1 guardado correctamente", id: result.rows[0].id });

  } catch (error) {
    console.error("❌ Error al guardar F1.1:", error);
    res.status(500).json({ error: "Error al guardar los datos del formulario" });
  }
};
