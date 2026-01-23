// db.ts
import {
  type BetterSQLite3Database,
  drizzle,
} from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import path from "node:path";
import fs from "node:fs";
import { getCodinerAppPath, getUserDataPath } from "../paths/paths";
import log from "electron-log";

const logger = log.scope("db");

// Database connection factory
let _db: ReturnType<typeof drizzle> | null = null;

/**
 * Get the database path based on the current environment
 */
export function getDatabasePath(): string {
  return path.join(getUserDataPath(), "sqlite.db");
}

/**
 * Initialize the database connection
 */
export function initializeDatabase(): BetterSQLite3Database<typeof schema> & {
  $client: Database.Database;
} {
  if (_db) return _db as any;

  const dbPath = getDatabasePath();
  logger.log("Initializing database at:", dbPath);

  // Check if the database file exists and remove it if it has issues
  try {
    if (fs.existsSync(dbPath)) {
      const stats = fs.statSync(dbPath);
      if (stats.size < 100) {
        logger.log("Database file exists but may be corrupted. Removing it...");
        fs.unlinkSync(dbPath);
      }
    }
  } catch (error) {
    logger.error("Error checking database file:", error);
  }

  fs.mkdirSync(getUserDataPath(), { recursive: true });
  fs.mkdirSync(getCodinerAppPath("."), { recursive: true });

  const sqlite = new Database(dbPath, { timeout: 10000 });
  sqlite.pragma("foreign_keys = ON");

  // Emergency patch for missing columns that cause crashes
  try {
    const tableInfo = sqlite.prepare("PRAGMA table_info(apps)").all() as any[];
    const columns = (tableInfo as { name: string }[]).map((c) => c.name);

    if (!columns.includes("vercel_team_slug")) {
      logger.log("Emergency patch: Adding vercel_team_slug to apps table");
      sqlite.prepare("ALTER TABLE apps ADD COLUMN vercel_team_slug TEXT").run();
    }
    if (!columns.includes("firebase_api_key")) {
      logger.log("Emergency patch: Adding firebase_api_key to apps table");
      sqlite.prepare("ALTER TABLE apps ADD COLUMN firebase_api_key TEXT").run();
    }
    // Also check for other recently added columns to be safe
    if (!columns.includes("docker_config")) {
      sqlite.prepare("ALTER TABLE apps ADD COLUMN docker_config TEXT").run();
    }
    if (!columns.includes("seo_metadata")) {
      sqlite.prepare("ALTER TABLE apps ADD COLUMN seo_metadata TEXT").run();
    }
  } catch (error) {
    logger.error("Failed to run emergency column patch:", error);
  }

  _db = drizzle(sqlite, { schema });

  try {
    const migrationsFolder = path.join(__dirname, "..", "..", "drizzle");
    if (!fs.existsSync(migrationsFolder)) {
      logger.error("Migrations folder not found:", migrationsFolder);
    } else {
      logger.log("Running migrations from:", migrationsFolder);
      migrate(_db, { migrationsFolder });
    }
  } catch (error) {
    logger.error("Migration error:", error);
  }

  return _db as any;
}

/**
 * Get the database instance (throws if not initialized)
 */
export function getDb(): BetterSQLite3Database<typeof schema> & {
  $client: Database.Database;
} {
  if (!_db) {
    throw new Error(
      "Database not initialized. Call initializeDatabase() first.",
    );
  }
  return _db as any;
}

export const db = new Proxy({} as any, {
  get(target, prop) {
    const database = getDb();
    return database[prop as keyof typeof database];
  },
}) as BetterSQLite3Database<typeof schema> & {
  $client: Database.Database;
};
