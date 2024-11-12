const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: process.env.MYSQL_HOST ,
    user: process.env.MYSQL_USER ,
    password: process.env.MYSQL_PASSWORD ,
    database: process.env.MYSQL_DB ,
    port: process.env.MYSQL_PORT,
  waitForConnections: true,  // Esperar si no hay conexiones disponibles
  connectionLimit: 500,       // Límite de conexiones en el pool
  queueLimit: 0
});

module.exports = db;
