ALTER TABLE `apps` ADD `vercel_team_slug` text;--> statement-breakpoint
ALTER TABLE `apps` ADD `firebase_api_key` text;--> statement-breakpoint
ALTER TABLE `apps` DROP COLUMN `vercel_team_id`;