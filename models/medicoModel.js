const db = require('../config/db');

class Medico {
    static async all() {
        const [results] = await db.query('SELECT * FROM medicos');
        return results;//trae todos los medicos de la base de datos
    }

    static async create(medico) {
        const query = "INSERT INTO medicos (nombre, email, estado,especialidad) VALUES ( ?, ?, ?, ?)";
        await db.query(query, [medico.nombre, medico.email, medico.activo, medico.especialidad]);//agrega un nuevo medico a la db
    }

    static async findById(id) {
        const [results] = await db.query('SELECT * FROM medicos WHERE id = ?', [id]);
        return results[0];//consulta a la db sobre un registro
    }

    static async update(id, medico) {
        const query = 'UPDATE medicos SET ? WHERE id = ?';
        await db.query(query, [medico, id]);//actualiza un registro
    }

    static async inactivar(id){//inactiva el estado del medico

        try{
        const [result] = await db.query(
            'update medicos set estado = 0 where id= ?', [id]
        );
        return result.affectedRows == 1;

        }catch(error) {
            return false;
        }
    }

    
    static async activar(id){//activa el estado del medico

        try{
        const [result] = await db.query(
            'update medicos set estado = 1 where id= ?', [id]
        );
        return result.affectedRows == 1;

        }catch(error) {
            return false;
            

        }}
        static async obtenerPorEspecialidad(id_especialidad) {
            const query = `
                SELECT m.id, m.nombre
                FROM medicos m
                JOIN medico_especialidad me ON m.id = me.id_medicos
                WHERE me.id_especialidad = ?
            `;
            const [medicos] = await db.query(query, [id_especialidad]);
            return medicos;
        }
        
        
       
}

module.exports = Medico;
