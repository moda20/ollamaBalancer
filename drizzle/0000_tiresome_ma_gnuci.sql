CREATE TABLE IF NOT EXISTS `proxy` (
	`id` int PRIMARY KEY AUTO_INCREMENT,
	`name` varchar(255) NOT NULL,
	`ip` varchar(255) NOT NULL,
	`port` int NOT NULL,
	`user_name` varchar(255),
	`password` varchar(255),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `proxy_id` PRIMARY KEY(`id`)
);
