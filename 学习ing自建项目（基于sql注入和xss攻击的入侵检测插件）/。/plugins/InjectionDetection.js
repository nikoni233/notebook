const fs = require('fs');
const path = require('path');

class InjectionDetection {
  constructor() {
    this.sqlVectors = this.loadVectors('sqlInjection.json');
    this.xssVectors = this.loadVectors('xssInjection.json');
    this.tempBlacklist = this.loadBlacklist('tempBlacklist.json');
    this.permBlacklist = this.loadBlacklist('permBlacklist.json');
    this.attackCount = 0;
    
    console.log('Intrusion Detection Plugin loaded successfully.');
    console.log('Admin panel available at: http://localhost:3002/admin');
  }

  loadVectors(filename) {
    const filePath = path.join(process.cwd(), 'attackVectors', filename);
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }

  loadBlacklist(filename) {
    const filePath = path.join(process.cwd(), 'blacklists', filename);
    return new Set(JSON.parse(fs.readFileSync(filePath, 'utf8')));
  }

  detect(input, ip) {
    if (this.isBlacklisted(ip)) {
      return { isAttack: true, type: 'Blacklisted IP' };
    }

    const sqlAttack = this.detectSQLInjection(input);
    const xssAttack = this.detectXSS(input);

    if (sqlAttack || xssAttack) {
      this.logAttack(ip, sqlAttack ? 'SQL Injection' : 'XSS');
      this.updateBlacklist(ip);
      this.attackCount++;
      return { isAttack: true, type: sqlAttack ? 'SQL Injection' : 'XSS' };
    }

    this.logNormal(ip);
    return { isAttack: false };
  }

  detectSQLInjection(input) {
    return this.sqlVectors.some(vector => new RegExp(vector, 'i').test(input));
  }

  detectXSS(input) {
    return this.xssVectors.some(vector => new RegExp(vector, 'i').test(input));
  }

  isBlacklisted(ip) {
    return this.permBlacklist.has(ip) || this.tempBlacklist.has(ip);
  }

  updateBlacklist(ip) {
    const now = Date.now();
    const attacks = this.tempBlacklist.get(ip) || [];
    attacks.push(now);
    
    // Remove attacks older than 1 hour
    const recentAttacks = attacks.filter(time => now - time < 3600000);
    
    if (recentAttacks.length >= 10) {
      this.tempBlacklist.set(ip, now + 7200000); // Ban for 2 hours
    } else {
      this.tempBlacklist.set(ip, recentAttacks);
    }

    this.saveBlacklist('tempBlacklist.json', this.tempBlacklist);
  }

  saveBlacklist(filename, blacklist) {
    const filePath = path.join(process.cwd(), 'blacklists', filename);
    fs.writeFileSync(filePath, JSON.stringify(Array.from(blacklist.entries()), null, 2));
  }

  logAttack(ip, type) {
    const log = {
      timestamp: new Date().toISOString(),
      ip,
      type,
      message: `Attack detected: ${type} from IP ${ip}`
    };
    this.appendLog(log);
  }

  logNormal(ip) {
    const log = {
      timestamp: new Date().toISOString(),
      ip,
      type: 'Normal',
      message: `Normal access from IP ${ip}`
    };
    this.appendLog(log);
  }

  appendLog(log) {
    const logPath = path.join(process.cwd(), 'logs', 'InjDetLogs.json');
    const logs = JSON.parse(fs.readFileSync(logPath, 'utf8'));
    logs.push(log);
    fs.writeFileSync(logPath, JSON.stringify(logs, null, 2));
  }
}

module.exports = InjectionDetection;