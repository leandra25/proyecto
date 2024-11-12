const db = require('../config/db');

class Especialidad {
    static async all() {
        const [results] = await db.query('SELECT * FROM especialidad');
        return results;
    }

    static async create(descripcion) {
        const query = 'INSERT INTO especialidad (descripcion) VALUES (?)';
        await db.query(query, [descripcion]);
    }

    static async findById(id) {
        const [results] = await db.query('SELECT * FROM especialidad WHERE id_especialidad = ?', [id]);
        return results[0];
    }

    static async update(id, descripcion) {
        const query = 'UPDATE especialidad SET descripcion = ? WHERE id_especialidad = ?';
        await db.query(query, [descripcion, id]);
    }

    static async delete(id) {
        const query = 'DELETE FROM especialidad WHERE id_especialidad = ?';
        await db.query(query, [id]);
    }
}

module.exports = Especialidad;
