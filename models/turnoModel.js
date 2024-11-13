const db = require('../config/db');

class Turno {
    static async solicitar(turno) {
        const query = 'INSERT INTO turnos (nombre,telefono,id_medicos,fecha, hora) VALUES (?, ?, ?, ?, ?)';
        await db.query(query, [turno.id_medico, turno.id_especialidad, turno.fecha, turno.hora, 'pendiente']);
    }

    static async listarDisponibles(id_especialidad) {
        const query = 'SELECT * FROM turnos WHERE id_medicos = ?';
        const [results] = await db.query(query, [id_especialidad]);
        return results;
    }
}

module.exports = Turno;

