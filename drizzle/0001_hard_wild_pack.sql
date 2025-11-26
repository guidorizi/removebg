CREATE TABLE `processed_images` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`original_image_url` text NOT NULL,
	`processed_image_url` text NOT NULL,
	`original_image_key` text NOT NULL,
	`processed_image_key` text NOT NULL,
	`original_file_name` varchar(255) NOT NULL,
	`file_size` int,
	`mime_type` varchar(100),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `processed_images_id` PRIMARY KEY(`id`)
);
