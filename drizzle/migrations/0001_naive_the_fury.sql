ALTER TABLE `user` RENAME COLUMN `age` TO `date_of_birth`;--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `date_of_birth` timestamp;