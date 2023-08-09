const mysql = require('mysql2');

module.exports = ConnectDB = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '@Tin18082002',
    database: 'beeshop'
});

