CREATE TABLE `account` (
	`userId` varchar(255) NOT NULL,
	`type` varchar(255) NOT NULL,
	`provider` varchar(255) NOT NULL,
	`providerAccountId` varchar(255) NOT NULL,
	`refresh_token` varchar(255),
	`access_token` varchar(255),
	`expires_at` int,
	`token_type` varchar(255),
	`scope` varchar(255),
	`id_token` varchar(2048),
	`session_state` varchar(255),
	CONSTRAINT `account_provider_providerAccountId_pk` PRIMARY KEY(`provider`,`providerAccountId`)
);
--> statement-breakpoint
CREATE TABLE `authenticator` (
	`credentialID` varchar(255) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`providerAccountId` varchar(255) NOT NULL,
	`credentialPublicKey` varchar(255) NOT NULL,
	`counter` int NOT NULL,
	`credentialDeviceType` varchar(255) NOT NULL,
	`credentialBackedUp` boolean NOT NULL,
	`transports` varchar(255),
	CONSTRAINT `authenticator_userId_credentialID_pk` PRIMARY KEY(`userId`,`credentialID`),
	CONSTRAINT `authenticator_credentialID_unique` UNIQUE(`credentialID`)
);
--> statement-breakpoint
CREATE TABLE `session` (
	`sessionToken` varchar(255) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `session_sessionToken` PRIMARY KEY(`sessionToken`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` varchar(50) NOT NULL,
	`name` varchar(255),
	`email` varchar(255),
	`date_of_birth` timestamp,
	`gender` varchar(6),
	`address` varchar(255),
	`marriage_status` varchar(9),
	`whatsapp` varchar(20),
	`emailVerified` timestamp(3),
	`image` varchar(255),
	`role` varchar(255) NOT NULL DEFAULT 'customer',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `verificationToken` (
	`identifier` varchar(255) NOT NULL,
	`token` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `verificationToken_identifier_token_pk` PRIMARY KEY(`identifier`,`token`)
);
--> statement-breakpoint
CREATE TABLE `certificates` (
	`id` varchar(50) NOT NULL,
	`ticket_id` varchar(50) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `certificates_id` PRIMARY KEY(`id`),
	CONSTRAINT `certificates_ticket_id_unique` UNIQUE(`ticket_id`)
);
--> statement-breakpoint
CREATE TABLE `event_availability` (
	`id` varchar(50) NOT NULL,
	`event_id` varchar(50) NOT NULL,
	`reguler_availability` int NOT NULL,
	`vip_availability` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `event_availability_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `event_price` (
	`id` varchar(50) NOT NULL,
	`event_id` varchar(50) NOT NULL,
	`reguler` int NOT NULL,
	`vip` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `event_price_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `event_questions` (
	`id` varchar(50) NOT NULL,
	`event_id` varchar(50) NOT NULL,
	`question` varchar(255) NOT NULL,
	`answer` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `event_questions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `events` (
	`id` varchar(50) NOT NULL,
	`title` varchar(255) NOT NULL,
	`poster_url` varchar(255) NOT NULL,
	`ticket_design_url` varchar(255) NOT NULL,
	`certificate_design_url` varchar(255),
	`description` varchar(255) NOT NULL,
	`venue` varchar(255) NOT NULL,
	`city` varchar(255) NOT NULL,
	`start_time` timestamp NOT NULL,
	`end_time` timestamp NOT NULL,
	`gmap_url` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `events_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` varchar(50) NOT NULL,
	`user_id` varchar(50) NOT NULL,
	`event_id` varchar(50) NOT NULL,
	`ticket_type` enum('reguler','vip') NOT NULL,
	`payment_method` varchar(20) NOT NULL,
	`order_qty` int NOT NULL DEFAULT 1,
	`sub_total` int NOT NULL,
	`order_status` enum('Pending','Active','Expired','Cancelled') DEFAULT 'Pending',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `orders_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `payment_details` (
	`id` varchar(50) NOT NULL,
	`order_id` varchar(50) NOT NULL,
	`transaction_id` varchar(50) NOT NULL,
	`gross_amount` decimal(10,2) NOT NULL,
	`currency` varchar(10) NOT NULL DEFAULT 'IDR',
	`payment_type` enum('qris','gopay','bank_transfer','echannel') NOT NULL,
	`transaction_time` timestamp NOT NULL,
	`transaction_status` varchar(20) NOT NULL,
	`fraud_status` varchar(20) NOT NULL,
	`expiry_time` timestamp NOT NULL,
	`qr_string` varchar(500),
	`acquirer` varchar(50),
	`va_numbers` json,
	`bill_key` varchar(50),
	`biller_code` varchar(50),
	`permata_va_number` varchar(50),
	`actions` json,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `payment_details_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tickets` (
	`id` varchar(50) NOT NULL,
	`order_id` varchar(50) NOT NULL,
	`event_id` varchar(50) NOT NULL,
	`participant_name` varchar(255),
	`whatsapp_number` varchar(15),
	`presence` enum('waiting','present','absent') NOT NULL DEFAULT 'waiting',
	`ticket_type` enum('reguler','vip') NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `tickets_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `account` ADD CONSTRAINT `account_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `authenticator` ADD CONSTRAINT `authenticator_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `session` ADD CONSTRAINT `session_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `certificates` ADD CONSTRAINT `certificates_ticket_id_tickets_id_fk` FOREIGN KEY (`ticket_id`) REFERENCES `tickets`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `event_availability` ADD CONSTRAINT `event_availability_event_id_events_id_fk` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `event_price` ADD CONSTRAINT `event_price_event_id_events_id_fk` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `event_questions` ADD CONSTRAINT `event_questions_event_id_events_id_fk` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `orders` ADD CONSTRAINT `orders_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `orders` ADD CONSTRAINT `orders_event_id_events_id_fk` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `payment_details` ADD CONSTRAINT `payment_details_order_id_orders_id_fk` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `tickets` ADD CONSTRAINT `tickets_order_id_orders_id_fk` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `tickets` ADD CONSTRAINT `tickets_event_id_events_id_fk` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `idx_event` ON `event_availability` (`event_id`);--> statement-breakpoint
CREATE INDEX `idx_event_ticket` ON `orders` (`event_id`,`ticket_type`);--> statement-breakpoint
CREATE INDEX `idx_user` ON `orders` (`user_id`);--> statement-breakpoint
CREATE INDEX `idx_order` ON `payment_details` (`order_id`);--> statement-breakpoint
CREATE INDEX `idx_transaction` ON `payment_details` (`transaction_id`);