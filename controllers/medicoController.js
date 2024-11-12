const Medico = require('../models/medicoModel');


const sanitizeInput = (input) => {
    return input.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/&/g, "&amp;");
};

class MedicoController {
    static async listar(req, res) {
        try {
            const medicos = await Medico.all();
            res.render('index', { medicos });
        } catch (err) {
            console.error(err);
            res.status(500).send('Error al obtener médicos');
        }
    }

    static crear(req, res) {
        res.render('create');
    }

    static async guardar(req, res) {
        try {
            const medico = {
                nombre: sanitizeInput(req.body.nombre),
                especialidad: sanitizeInput(req.body.especialidad),
                email: sanitizeInput(req.body.email),
                activo: true
            };
            await Medico.create(medico);
            res.redirect('/');
        } catch (err) {
            console.error(err);
            res.status(500).send('Error al guardar médico');
        }
    }

    static async editar(req, res) {
        try {
            const medico = await Medico.findById(req.params.id);
            res.render('edit', { medico });
        } catch (err) {
            console.error(err);
            res.status(500).send('Error al obtener médico');
        }
    }

    static async actualizar(req, res) {
        try {
            const medico = {
                nombre: sanitizeInput(req.body.nombre),
                especialidad: sanitizeInput(req.body.especialidad),
                email: sanitizeInput(req.body.email)
            };
            await Medico.update(req.params.id, medico);
            res.redirect('/');
        } catch (err) {
            console.error(err);
            res.status(500).send('Error al actualizar médico');
        }
    }
        
    static  async inactivar(req, res){
        const id = req.params.id;
        console.log(`inactivando medico con ID: ${id}`);
          if ( await Medico.inactivar(id)){
              res.json({exito : "true"});
            }else{
              res.json({exito : "false"});
    }
}
         
    static async activar(req, res){
        const id = req.params.id;
        console.log(`Activando médico con ID: ${id}`);
          if ( await Medico.activar(id)){
              res.json({exito: "true"});
            }else{
              res.json({exito: "false"}); 
    }
}

    
}

module.exports = MedicoController;
