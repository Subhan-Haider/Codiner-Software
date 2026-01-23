# Database Migration - Per-Project Integrations

## Issue
The application is throwing an error: `no such column: "firebase_project_id"` because the database migration hasn't been applied yet.

## Solution
The migration file has been created at `drizzle/0021_per_project_integrations.sql` and will add three new columns to the `apps` table:
- `firebase_project_id`
- `supabase_project_url`
- `slack_webhook_url`

## Next Steps
**Please restart the application** (`npm start`) to apply the database migration automatically. The migration runs on app startup via the `initializeDatabase()` function in `src/db/index.ts`.

Once restarted, the new columns will be available and the error will be resolved.
