const express = require('express');
const router = express.Router();
const MedicoController = require('../controllers/medicoController');

router.get('/', MedicoController.listar);
router.get('/create', MedicoController.crear);
router.post('/create', MedicoController.guardar);
router.get('/edit/:id', MedicoController.editar);
router.post('/edit/:id', MedicoController.actualizar);
router.post('/activar/:id', MedicoController.activar);
router.post('/inactivar/:id', MedicoController.inactivar);


module.exports = router;
