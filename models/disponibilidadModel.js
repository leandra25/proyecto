const db = require('../config/db');

class Disponibilidad {
    static async obtenerHorariosPorMedico(id_medico, fecha) {
        const query = `
            SELECT fecha, hora 
            FROM disponibilidad
            WHERE id_medicos = ? 
            AND fecha >= CURDATE()  
            AND (fecha = ? OR ? IS NULL)  
        `;
        const [horarios] = await db.query(query, [id_medico, fecha, hora]);
        return horarios;
    }
}

module.exports = Disponibilidad;
