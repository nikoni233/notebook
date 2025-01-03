const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root123456',
    database: 'test'
});

db.connect(err => {
    if (err) {
        console.error('Database connection error: ', err);
    } else {
        console.log('Database connected');
    }
});

module.exports = db;
