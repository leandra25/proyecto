// routes/especialidadRoutes.js
const express = require('express');
const router = express.Router();
const EspecialidadController = require('../controllers/especialidadController');

router.get('/especialidad', EspecialidadController.listar);
router.get('/especialidad/create', EspecialidadController.crear);
router.post('/especialidad/create', EspecialidadController.guardar);
router.get('/especialidad/edit/:id', EspecialidadController.editar);
router.post('/especialidad/edit/:id', EspecialidadController.actualizar);
router.post('/especialidad/delete/:id', EspecialidadController.eliminar);

module.exports = router;
