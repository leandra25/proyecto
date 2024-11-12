const Especialidad = require('../models/especialidadModel');

class EspecialidadController {
    static async listar(req, res) {
        try {
            const especialidades = await Especialidad.all();
            res.render('especialidadList', { especialidades });
        } catch (err) {
            console.error(err);
            res.status(500).send('Error al obtener especialidades');
        }
    }

    static crear(req, res) {
        res.render('createEspecialidad');
    }

    static async guardar(req, res) {
        try {
            await Especialidad.create(req.body.descripcion);
            res.redirect('/especialidad');
        } catch (err) {
            console.error(err);
            res.status(500).send('Error al guardar especialidad');
        }
    }

    static async editar(req, res) {
        try {
            const especialidad = await Especialidad.findById(req.params.id);
            res.render('editEspecialidad', { especialidad });
        } catch (err) {
            console.error(err);
            res.status(500).send('Error al obtener especialidad');
        }
    }

    static async actualizar(req, res) {
        try {
            await Especialidad.update(req.params.id, req.body.descripcion);
            res.redirect('/especialidad');
        } catch (err) {
            console.error(err);
            res.status(500).send('Error al actualizar especialidad');
        }
    }

    static async eliminar(req, res) {
        try {
            await Especialidad.delete(req.params.id);
            res.redirect('/especialidad');
        } catch (err) {
            console.error(err);
            res.status(500).send('Error al eliminar especialidad');
        }
    }
}

module.exports = EspecialidadController;
