const db = require('../config/db');

class Medico {
    static async all() {
        const connection = await db; 
        try {
            const [results] = await connection.query('SELECT * FROM medicos');
            return results; 
        }  finally {
            await connection.end(); 
        }
    }

    static async create(medico) {
        const connection = await db; 
        const query = "INSERT INTO medicos (nombre, email, estado, especialidad) VALUES (?, ?, ?, ?)";
        try {
            await connection.query(query, [medico.nombre, medico.email, medico.activo, medico.especialidad]); 
        }  finally {
            await connection.end(); 
        }
    }

    static async findById(id) {
        const connection = await db; 
        try {
            const [results] = await connection.query('SELECT * FROM medicos WHERE id = ?', [id]);
            return results[0]; 
        }  finally {
            await connection.end(); 
        }
    }

    static async update(id, medico) {
        const connection = await db; 
        const query = 'UPDATE medicos SET ? WHERE id = ?';
        try {
            await connection.query(query, [medico, id]);
        }  finally {
            await connection.end(); 
        }
    }

    static async inactivar(id) {
        const connection = await db; 
        try {
            const [result] = await connection.query(
                'UPDATE medicos SET estado = 0 WHERE id = ?', [id]
            );
            return result.affectedRows === 1; 
        } catch (error) {
            console.error('Error al inactivar el médico:', error);
            return false; 
        }  finally {
            await connection.end(); 
        }
    }

    static async activar(id) {
        const connection = await db; 
        try {
            const [result] = await connection.query(
                'UPDATE medicos SET estado = 1 WHERE id = ?', [id]
            );
            return result.affectedRows === 1; 
        } catch (error) {
            console.error('Error al activar el médico:', error);
            return false; 
        }  finally {
            await connection.end(); 
        }
    }

    static async obtenerPorEspecialidad(id_especialidad) {
        const connection = await db; 
        const query = `
            SELECT m.id, m.nombre
            FROM medicos m
            JOIN medico_especialidad me ON m.id = me.id_medicos
            WHERE me.id_especialidad = ?
        `;
        try {
            const [medicos] = await connection.query(query, [id_especialidad]);
            return medicos; 
        } finally {
            await connection.end(); 
        }
    }
}

module.exports = Medico;

