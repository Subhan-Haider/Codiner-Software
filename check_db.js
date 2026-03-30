const Database = require('better-sqlite3');
const path = require('path');
const os = require('os');

const dbPath = path.join(process.env.APPDATA, 'Codiner', 'sqlite.db');
console.log('Opening DB at:', dbPath);

const db = new Database(dbPath);
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
console.log('Tables found:', JSON.stringify(tables, null, 2));

const language_model_providers = tables.find(t => t.name.toLowerCase() === 'language_model_providers');
if (language_model_providers) {
  console.log('language_model_providers table EXISTS!');
  const columns = db.prepare("PRAGMA table_info(language_model_providers)").all();
  console.log('Columns:', JSON.stringify(columns, null, 2));
} else {
  console.log('language_model_providers table MISSING!');
}

db.close();
