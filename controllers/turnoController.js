const Medico = require('../models/medicoModel');
const Disponibilidad = require('../models/disponibilidadModel');
const Especialidad = require('../models/especialidadModel');

class TurnoController {
    // Renderizar la página de solicitud de turno
    static async listar(req, res) {
        try {
            const especialidades = await Especialidad.all(); // Traer todas las especialidades
            res.render('solicitarTurno', { especialidades }); // Renderiza la vista con las especialidades
        } catch (err) {
            console.error(err);
            res.status(500).send('Error al obtener las especialidades');
        }
    }

    // Obtener médicos según la especialidad seleccionada
    static async obtenerMedicosPorEspecialidad(req, res) {
        const id_especialidad = req.params.id_especialidad;
        try {
            const medicos = await Medico.obtenerPorEspecialidad(id_especialidad); // Obtener médicos de la especialidad
            res.json(medicos);  // Devolver médicos en formato JSON
        } catch (err) {
            console.error(err);
            res.status(500).send('Error al obtener los médicos');
        }
    }

    // Obtener horarios disponibles de un médico
    static async obtenerHorariosDisponibles(req, res) {
        const id_medico = req.params.id_medico;
        const fecha = req.query.fecha; // Tomar la fecha que viene desde la vista
        try {
            const horarios = await Disponibilidad.obtenerHorariosPorMedico(id_medico, fecha); // Obtener horarios del médico
            res.json(horarios);  // Devolver horarios en formato JSON
        } catch (err) {
            console.error(err);
            res.status(500).send('Error al obtener los horarios');
        }
    }
    static async solicitar(req, res) {
        const { id_especialidad, id_medico, fecha, hora } = req.body;
        try {
            await Turno.solicitar({ id_medico, id_especialidad, fecha, hora });
            res.redirect('/turnos');
        } catch (err) {
            console.error(err);
            res.status(500).send('Error al solicitar turno');
        }
    }
}

module.exports = TurnoController;
