// routes/especialidadRoutes.js
const express = require('express');
const router = express.Router();
const EspecialidadController = require('../controllers/especialidadController');

router.get('/', EspecialidadController.listar);
router.get('/create', EspecialidadController.crear);
router.post('/create', EspecialidadController.guardar);
router.get('/edit/:id', EspecialidadController.editar);
router.post('/edit/:id', EspecialidadController.actualizar);
router.post('/delete/:id', EspecialidadController.eliminar);

module.exports = router;
