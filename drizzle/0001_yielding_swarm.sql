ALTER TABLE `ollamaServers` MODIFY COLUMN `id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `proxy` ADD `protocol` varchar(255);--> statement-breakpoint
ALTER TABLE `proxy` ADD `status` tinyint NOT NULL;