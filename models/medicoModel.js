const db = require('../config/db');

class Medico {
    static async all() {
        const connection = await db; // Obtén la conexión
        try {
            const [results] = await connection.query('SELECT * FROM medicos');
            return results; // Devuelve todos los médicos de la base de datos
        } finally {
            await connection.end(); // Asegúrate de cerrar la conexión después
        }
    }

    static async create(medico) {
        const connection = await db; // Obtén la conexión
        const query = "INSERT INTO medicos (nombre, email, estado, especialidad) VALUES (?, ?, ?, ?)";
        try {
            await connection.query(query, [medico.nombre, medico.email, medico.activo, medico.especialidad]); // Agrega un nuevo médico a la DB
        } finally {
            await connection.end(); // Cierra la conexión
        }
    }

    static async findById(id) {
        const connection = await db; // Obtén la conexión
        try {
            const [results] = await connection.query('SELECT * FROM medicos WHERE id = ?', [id]);
            return results[0]; // Consulta a la DB sobre un registro específico
        } finally {
            await connection.end(); // Cierra la conexión
        }
    }

    static async update(id, medico) {
        const connection = await db; // Obtén la conexión
        const query = 'UPDATE medicos SET ? WHERE id = ?';
        try {
            await connection.query(query, [medico, id]); // Actualiza el registro
        } finally {
            await connection.end(); // Cierra la conexión
        }
    }

    static async inactivar(id) {
        const connection = await db; // Obtén la conexión
        try {
            const [result] = await connection.query(
                'UPDATE medicos SET estado = 0 WHERE id = ?', [id]
            );
            return result.affectedRows === 1; // Devuelve true si se actualizó correctamente
        } catch (error) {
            console.error('Error al inactivar el médico:', error);
            return false; // Si ocurre un error, devuelve false
        } finally {
            await connection.end(); // Cierra la conexión
        }
    }

    static async activar(id) {
        const connection = await db; // Obtén la conexión
        try {
            const [result] = await connection.query(
                'UPDATE medicos SET estado = 1 WHERE id = ?', [id]
            );
            return result.affectedRows === 1; // Devuelve true si se actualizó correctamente
        } catch (error) {
            console.error('Error al activar el médico:', error);
            return false; // Si ocurre un error, devuelve false
        } finally {
            await connection.end(); // Cierra la conexión
        }
    }

    static async obtenerPorEspecialidad(id_especialidad) {
        const connection = await db; // Obtén la conexión
        const query = `
            SELECT m.id, m.nombre
            FROM medicos m
            JOIN medico_especialidad me ON m.id = me.id_medicos
            WHERE me.id_especialidad = ?
        `;
        try {
            const [medicos] = await connection.query(query, [id_especialidad]);
            return medicos; // Devuelve los médicos según la especialidad
        } finally {
            await connection.end(); // Cierra la conexión
        }
    }
}

module.exports = Medico;

