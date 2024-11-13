const db = require('../config/db');  

class Especialidad {
  static async all() {
    const connection = await db;  
    try {
      const [results] = await connection.query('SELECT * FROM especialidad');
      return results;  
    } finally {
      await connection.end();  
    }
  }
  static async create(descripcion) {
    const connection = await db;  
    const query = 'INSERT INTO especialidad (descripcion) VALUES (?)';
    try {
      await connection.query(query, [descripcion]);
    } finally {
      await connection.end(); 
    }
  }
  static async findById(id) {
    const connection = await db;  
    try {
      const [results] = await connection.query('SELECT * FROM especialidad WHERE id_especialidad = ?', [id]);
      return results[0];  
    } finally {
      await connection.end(); 
    }
  }

  static async update(id, descripcion) {
    const connection = await db;  
    const query = 'UPDATE especialidad SET descripcion = ? WHERE id_especialidad = ?';
    try {
      await connection.query(query, [descripcion, id]);
    } finally {
      await connection.end();  
    }
  }

  static async delete(id) {
    const connection = await db; 
    const query = 'DELETE FROM especialidad WHERE id_especialidad = ?';
    try {
      await connection.query(query, [id]);
    } finally {
      await connection.end();  
    }
  }
}

module.exports = Especialidad;
