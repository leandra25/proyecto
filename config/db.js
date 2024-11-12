const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER ||'consulta',
    password: process.env.MYSQL_PASSWORD ||'1234',
    database: process.env.MYSQL_DB || 'consula_agenda'
    port: process.env.MYSQL_PORT || '3000'
});

module.exports = db;
