const Database = require('better-sqlite3');
const path = require('path');
const dbPath = path.resolve('userData/sqlite.db');
const db = new Database(dbPath);
const rows = db.prepare("SELECT id, chatId, role, model, content FROM messages ORDER BY createdAt DESC LIMIT 5").all();
console.log(JSON.stringify(rows, null, 2));
db.close();
