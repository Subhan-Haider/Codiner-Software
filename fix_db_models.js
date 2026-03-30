const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dbPath = path.resolve(__dirname, 'userData/sqlite.db');
if (!fs.existsSync(dbPath)) {
  console.error("Database not found at:", dbPath);
  process.exit(1);
}

const db = new Database(dbPath);

console.log("Checking for chats with broken Mistral model...");

const brokenChats = db.prepare("SELECT id FROM messages WHERE model = 'mistralai/mistral-7b-instruct:free'").all();

if (brokenChats.length === 0) {
  console.log("No broken chats found.");
} else {
  console.log(`Found ${brokenChats.length} messages with broken model. Fixing...`);
  db.prepare("UPDATE messages SET model = 'google/gemini-2.0-flash-exp:free' WHERE model = 'mistralai/mistral-7b-instruct:free'").run();
  console.log("Update complete!");
}

db.close();
