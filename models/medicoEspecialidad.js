class MedicoEspecialidad {
    constructor(id_medico_especialidad, id_medico, id_especialidad, matricula, fecha_matricula) {
      this.id_medico_especialidad = id_medico_especialidad;
      this.id_medico = id_medico;
      this.id_especialidad = id_especialidad;
      this.matricula = matricula;
      this.fecha_matricula = fecha_matricula;
    }
  
    static async getAll() {
      const [rows] = await connection.promise().query(`
        SELECT me.*, m.nombre AS medico_nombre, e.descripcion AS especialidad_descripcion
        FROM medico_especialidad me
        JOIN medicos m ON me.id_medico = m.id
        JOIN especialidades e ON me.id_especialidad = e.id_especialidad
      `);
      return rows;
    }
  
    static async create(id_medico, id_especialidad, matricula, fecha_matricula) {
      const [result] = await connection.promise().query(`
        INSERT INTO medico_especialidad (id_medico, id_especialidad, matricula, fecha_matricula)
        VALUES (?, ?, ?, ?)`, [id_medico, id_especialidad, matricula, fecha_matricula]
      );
      return result;
    }
  }
  
  module.exports = MedicoEspecialidad;
  
