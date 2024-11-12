const express = require('express');
const router = express.Router();
const TurnoController = require('../controllers/turnoController');

router.get('/turnos', TurnoController.listar);
router.post('/turnos/solicitar', TurnoController.solicitar);


// Ruta para obtener médicos según especialidad
router.get('/medicos/:id_especialidad', TurnoController.obtenerMedicosPorEspecialidad);

// Ruta para obtener horarios disponibles de un médico
router.get('/horarios/:id_medico', TurnoController.obtenerHorariosDisponibles);



module.exports = router;
