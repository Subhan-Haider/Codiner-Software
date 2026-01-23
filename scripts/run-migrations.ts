
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import path from "node:path";
import fs from "node:fs";

const dbPath = path.resolve("./userData/sqlite.db");
console.log("Migrating database at:", dbPath);

const sqlite = new Database(dbPath);
const db = drizzle(sqlite);

const migrationsFolder = path.resolve("./drizzle");
console.log("Running migrations from:", migrationsFolder);

try {
    migrate(db, { migrationsFolder });
    console.log("Migrations completed successfully!");
} catch (error) {
    console.error("Migration error:", error);
    process.exit(1);
} finally {
    sqlite.close();
}
