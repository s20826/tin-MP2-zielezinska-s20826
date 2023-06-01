const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password:'toor',
    database: 'tin-mp2'
});

module.exports = pool;