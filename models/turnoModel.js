const db = require('../config/db'); 

class Turno {
 
  static async solicitar(turno) {
    const connection = await db;  
    const query = 'INSERT INTO turnos (nombre, telefono, id_medicos, fecha, hora, estado) VALUES (?, ?, ?, ?, ?, ?)';
    try {
      await connection.query(query, [turno.nombre, turno.telefono, turno.id_medico, turno.fecha, turno.hora, 'pendiente']);
    } finally {
      await connection.end();  
    }
  }

  
  static async listarDisponibles(id_especialidad) {
    const connection = await db;  
    const query = 'SELECT * FROM turnos WHERE id_especialidad = ? AND estado = "pendiente"';
    try {
      const [results] = await connection.query(query, [id_especialidad]);
      return results;  
    } finally {
      await connection.end();  
    }
  }
}

module.exports = Turno;
