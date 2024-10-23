const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Whitelist middleware
const whitelist = new Set(JSON.parse(fs.readFileSync(path.join(process.cwd(), 'pluginAdmin', 'whitelist.json'), 'utf8')));

const checkWhitelist = (req, res, next) => {
  if (whitelist.size === 0 || whitelist.has(req.ip)) {
    next();
  } else {
    res.status(403).json({ message: 'Access denied' });
  }
};

router.use(checkWhitelist);

// Admin panel routes
router.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'pluginAdmin', 'admin.html'));
});

router.get('/stats', (req, res) => {
  const stats = {
    attackCount: global.injectionDetection.attackCount,
  };
  res.json(stats);
});

router.get('/vectors', (req, res) => {
  const sqlVectors = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'attackVectors', 'sqlInjection.json'), 'utf8'));
  const xssVectors = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'attackVectors', 'xssInjection.json'), 'utf8'));
  res.json({ sqlVectors, xssVectors });
});

router.post('/vectors', (req, res) => {
  const { type, vector } = req.body;
  const filename = type === 'sql' ? 'sqlInjection.json' : 'xssInjection.json';
  const filePath = path.join(process.cwd(), 'attackVectors', filename);
  const vectors = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  vectors.push(vector);
  fs.writeFileSync(filePath, JSON.stringify(vectors, null, 2));
  res.json({ message: 'Vector added successfully' });
});

router.get('/blacklists', (req, res) => {
  const tempBlacklist = Array.from(global.injectionDetection.tempBlacklist.entries());
  const permBlacklist = Array.from(global.injectionDetection.permBlacklist);
  res.json({ tempBlacklist, permBlacklist });
});

router.post('/blacklists', (req, res) => {
  const { ip, type } = req.body;
  if (type === 'permanent') {
    global.injectionDetection.permBlacklist.add(ip);
    const filePath = path.join(process.cwd(), 'blacklists', 'permBlacklist.json');
    fs.writeFileSync(filePath, JSON.stringify(Array.from(global.injectionDetection.permBlacklist), null, 2));
  } else if (type === 'temporary') {
    global.injectionDetection.tempBlacklist.set(ip, Date.now() + 7200000); // Ban for 2 hours
    global.injectionDetection.saveBlacklist('tempBlacklist.json', global.injectionDetection.tempBlacklist);
  }
  res.json({ message: 'IP added to blacklist' });
});

router.get('/logs', (req, res) => {
  const logPath = path.join(process.cwd(), 'logs', 'InjDetLogs.json');
  const logs = JSON.parse(fs.readFileSync(logPath, 'utf8'));
  res.json(logs);
});

module.exports = router;