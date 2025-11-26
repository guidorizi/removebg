ALTER TABLE `users` DROP INDEX `users_openId_unique`;--> statement-breakpoint
ALTER TABLE `processed_images` MODIFY COLUMN `id` serial AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `processed_images` MODIFY COLUMN `created_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `id` serial AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `name` varchar(255);--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `email` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `processed_images` ADD `original_url` text NOT NULL;--> statement-breakpoint
ALTER TABLE `processed_images` ADD `processed_url` text NOT NULL;--> statement-breakpoint
ALTER TABLE `processed_images` ADD `original_key` varchar(255);--> statement-breakpoint
ALTER TABLE `processed_images` ADD `processed_key` varchar(255);--> statement-breakpoint
ALTER TABLE `users` ADD `password` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `created_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_email_unique` UNIQUE(`email`);--> statement-breakpoint
ALTER TABLE `processed_images` DROP COLUMN `user_id`;--> statement-breakpoint
ALTER TABLE `processed_images` DROP COLUMN `original_image_url`;--> statement-breakpoint
ALTER TABLE `processed_images` DROP COLUMN `processed_image_url`;--> statement-breakpoint
ALTER TABLE `processed_images` DROP COLUMN `original_image_key`;--> statement-breakpoint
ALTER TABLE `processed_images` DROP COLUMN `processed_image_key`;--> statement-breakpoint
ALTER TABLE `processed_images` DROP COLUMN `original_file_name`;--> statement-breakpoint
ALTER TABLE `processed_images` DROP COLUMN `file_size`;--> statement-breakpoint
ALTER TABLE `processed_images` DROP COLUMN `mime_type`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `openId`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `loginMethod`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `role`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `createdAt`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `updatedAt`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `lastSignedIn`;