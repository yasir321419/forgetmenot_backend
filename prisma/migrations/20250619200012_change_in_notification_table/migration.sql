-- DropForeignKey
ALTER TABLE `Notification` DROP FOREIGN KEY `Notification_reminderId_fkey`;

-- AlterTable
ALTER TABLE `Notification` ADD COLUMN `milestoneId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `fk_reminder_id` FOREIGN KEY (`reminderId`) REFERENCES `RemiderCategory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `fk_milestone_id` FOREIGN KEY (`milestoneId`) REFERENCES `Milestone`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
