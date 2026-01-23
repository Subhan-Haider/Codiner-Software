// Manual migration script to add the new columns
// Run this with: node scripts/apply-migration.js

const Database = require('better-sqlite3');
const path = require('path');
const os = require('os');

// Get the database path (same logic as getUserDataPath in development)
const dbPath = path.resolve('./userData/sqlite.db');

console.log('Applying migration to:', dbPath);

try {
    const db = new Database(dbPath);

    // Check if columns already exist
    const tableInfo = db.prepare("PRAGMA table_info(apps)").all();
    const columnNames = tableInfo.map(col => col.name);

    console.log('Current columns:', columnNames);

    // Add firebase_project_id if it doesn't exist
    if (!columnNames.includes('firebase_project_id')) {
        console.log('Adding firebase_project_id column...');
        db.prepare('ALTER TABLE apps ADD COLUMN firebase_project_id TEXT').run();
        console.log('✓ firebase_project_id added');
    } else {
        console.log('✓ firebase_project_id already exists');
    }

    // Add supabase_project_url if it doesn't exist
    if (!columnNames.includes('supabase_project_url')) {
        console.log('Adding supabase_project_url column...');
        db.prepare('ALTER TABLE apps ADD COLUMN supabase_project_url TEXT').run();
        console.log('✓ supabase_project_url added');
    } else {
        console.log('✓ supabase_project_url already exists');
    }

    // Add slack_webhook_url if it doesn't exist
    if (!columnNames.includes('slack_webhook_url')) {
        console.log('Adding slack_webhook_url column...');
        db.prepare('ALTER TABLE apps ADD COLUMN slack_webhook_url TEXT').run();
        console.log('✓ slack_webhook_url added');
    } else {
        console.log('✓ slack_webhook_url already exists');
    }

    db.close();
    console.log('\n✅ Migration applied successfully!');
    console.log('You can now restart the app.');

} catch (error) {
    console.error('❌ Error applying migration:', error);
    process.exit(1);
}
