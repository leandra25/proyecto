const db = require('../config/db');  

class Disponibilidad {
  static async obtenerHorariosPorMedico(id_medico, fecha) {
    const connection = await db;  
    const query = `
      SELECT fecha, hora 
      FROM disponibilidad
      WHERE id_medicos = ? 
      AND fecha >= CURDATE()  
      AND (fecha = ? OR ? IS NULL)`;

    try {
      
      const [horarios] = await connection.query(query, [id_medico, fecha, fecha]);
      return horarios; 
    } finally {
      await connection.end();  
    }
  }
}

module.exports = Disponibilidad;
