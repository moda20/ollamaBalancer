CREATE TABLE IF NOT EXISTS `ollamaServers` (
	`id` int,
	`port` int NOT NULL,
	`host` varchar(255) NOT NULL,
	`location` varchar(255) NOT NULL,
	`runner` varchar(255) NOT NULL,
	`models` json,
	`last_checked` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `ollamaServers_id` PRIMARY KEY(`id`),
	CONSTRAINT `ollamaServers_host_unique` UNIQUE(`host`)
);
