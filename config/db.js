const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: process.env.DB_HOST,  // Esto toma el valor de la variable de entorno DB_HOST
  user: process.env.DB_USER,  // Toma el valor de DB_USER
  password: process.env.DB_PASSWORD,  // Toma el valor de DB_PASSWORD
  database: process.env.DB_NAME,  // Toma el valor de DB_NAME
  port: process.env.DB_PORT || 3306 // Puerto de la base de datos, por defecto es 3306 para MySQL
});

connection.connect(err => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err.stack);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

module.exports = db;
