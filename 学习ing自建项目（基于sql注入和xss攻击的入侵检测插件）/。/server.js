const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');
const app = express();

// Middleware configuration
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Import the InjectionDetection plugin
const InjectionDetection = require('./plugins/InjectionDetection.js');
// Initialize the plugin
const injectionDetection = new InjectionDetection();

// Admin routes
const adminRoutes = require('./routes/adminRoutes.js');
app.use('/admin', adminRoutes);

// Serve static files
app.use(express.static('public'));

// Middleware to check for attacks
app.use((req, res, next) => {
  const input = req.body.content || req.body.username || req.body.password || req.query.input || '';
  const ip = req.ip;
  
  const result = injectionDetection.detect(input, ip);
  
  if (result.isAttack) {
    return res.status(403).json({ message: 'Attack detected', type: result.type });
  }
  next();
});

// XSS part
var content = "";
app.get("/content", (req, res) => {
    res.send(content);
});

app.post('/setContent', (req, res) => {
    content = req.body.content;
    res.send("OK");
});

// SQL Injection part
const db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
        return console.error('Error connecting to SQLite database:', err.message);
    }
    console.log('Connected to in-memory SQLite database.');

    const sqlFilePath = './sql/users.sql';
    const sqlContent = fs.readFileSync(sqlFilePath, 'utf-8');

    db.exec(sqlContent, (err) => {
        if (err) {
            console.error('Error executing SQL script:', err.message);
        } else {
            console.log('Database initialized with users table and data.');
        }
    });
});

app.post('/login', (req, res) => {
    var sql = `SELECT * FROM users WHERE username='${req.body.username}' AND password='${req.body.password}'`;
    console.log(sql);

    db.all(sql, function(err, data) {
        if(err) {
            console.log(err);
            res.send("Query error");
            return;
        }
        console.log(data);
        if (data.length > 0) {
            res.json({
                message: "Login successful",
                userInfo: data
            });
        } else {
            res.json({
                message: "Login failed",
                userInfo: "Login failed, unable to query"
            });
        }
    });
});

const port = 3002;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Admin panel available at http://localhost:${port}/admin`);
});