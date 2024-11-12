const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: 'localhost',
    user: 'consulta',
    password: '1234',
    database: 'consula_agenda'
});

module.exports = db;
