ALTER TABLE `apps` ADD `firebase_project_id` text;--> statement-breakpoint
ALTER TABLE `apps` ADD `supabase_project_url` text;--> statement-breakpoint
ALTER TABLE `apps` ADD `slack_webhook_url` text;--> statement-breakpoint
ALTER TABLE `apps` DROP COLUMN `supabase_project_id`;--> statement-breakpoint
ALTER TABLE `apps` DROP COLUMN `supabase_parent_project_id`;--> statement-breakpoint
ALTER TABLE `apps` DROP COLUMN `supabase_organization_slug`;