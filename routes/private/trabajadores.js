const express = require('express');
const router = express.Router();
const Trabajador = require('../../models/Trabajador');

// Obtener todos los trabajadores
router.get('/trabajadores', async (req, res) => {
  try {
    const trabajadores = await Trabajador.findAll();
    res.json(trabajadores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear un nuevo trabajador
router.post('/trabajadores', async (req, res) => {
  try {
    const trabajador = await Trabajador.create(req.body);
    res.status(201).json(trabajador);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
