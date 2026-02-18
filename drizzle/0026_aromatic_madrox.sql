CREATE TABLE `coding_patterns` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`pattern_type` text NOT NULL,
	`pattern_data` text NOT NULL,
	`frequency` integer DEFAULT 1 NOT NULL,
	`last_used` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`confidence_score` real DEFAULT 0.5 NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `learning_sessions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`session_type` text NOT NULL,
	`learning_data` text NOT NULL,
	`user_feedback` text,
	`quality_score` integer,
	`timestamp` integer DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `performance_metrics` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`project_id` text NOT NULL,
	`metric_type` text NOT NULL,
	`metric_value` real NOT NULL,
	`metric_metadata` text,
	`timestamp` integer DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `personalization_metrics` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`score` real DEFAULT 0 NOT NULL,
	`patterns_learned` integer DEFAULT 0 NOT NULL,
	`problems_solved` integer DEFAULT 0 NOT NULL,
	`preferences_identified` integer DEFAULT 0 NOT NULL,
	`average_confidence` real DEFAULT 0 NOT NULL,
	`timestamp` integer DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `seo_metadata` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`project_id` text NOT NULL,
	`file_path` text NOT NULL,
	`title` text,
	`description` text,
	`keywords` text,
	`og_data` text,
	`schema_markup` text,
	`last_updated` integer DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sitemap_entries` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`project_id` text NOT NULL,
	`url` text NOT NULL,
	`priority` real DEFAULT 0.5 NOT NULL,
	`change_frequency` text DEFAULT 'weekly' NOT NULL,
	`last_modified` integer DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `solved_problems` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`problem_description` text NOT NULL,
	`problem_embedding` blob,
	`solution_code` text NOT NULL,
	`solution_approach` text,
	`success_rating` integer DEFAULT 5 NOT NULL,
	`project_context` text,
	`tags` text,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `user_preferences` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`preference_key` text NOT NULL,
	`preference_value` text NOT NULL,
	`confidence` real DEFAULT 0.5 NOT NULL,
	`updated_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_preferences_preference_key_unique` ON `user_preferences` (`preference_key`);