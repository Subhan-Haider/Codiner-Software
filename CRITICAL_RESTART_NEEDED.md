# Critical: App Restart Required

## Current Situation
Your app has been running for **11+ hours** without restart. The database migration was created but **has not been applied** because migrations only run when the app starts.

## Why the Error Persists
The running app instance is trying to use the new schema (which includes `firebase_project_id`, `supabase_project_url`, `slack_webhook_url`) but the actual database doesn't have these columns yet.

## Solution: You MUST Restart the App

### Option 1: Restart Normally (Recommended)
1. Go to your terminal where `npm start` is running
2. Press `Ctrl + C` to stop it
3. Wait for it to fully stop
4. Run `npm start` again
5. The migration will apply automatically on startup

### Option 2: If You Can't Stop the Terminal
1. Close the terminal window entirely
2. Open a new terminal
3. Navigate to `c:\Users\setup\Videos\codiner.online`
4. Run `npm start`

### Option 3: Reset Database (Last Resort)
If restart doesn't work, you can delete the database file and let it recreate:
1. Stop the app (`Ctrl + C`)
2. Delete `userData/sqlite.db`
3. Start the app again (`npm start`)
4. ⚠️ **Warning**: This will delete all your apps and chats!

## What Happens on Restart
When you restart:
1. The app initializes (`src/db/index.ts`)
2. Drizzle runs all pending migrations including `0021_magical_queen_noir.sql`
3. The new columns are added
4. Everything works normally

**The app CANNOT work properly until you restart it.**
