ALTER TABLE `processed_images` MODIFY COLUMN `original_url` longtext NOT NULL;--> statement-breakpoint
ALTER TABLE `processed_images` MODIFY COLUMN `processed_url` longtext NOT NULL;