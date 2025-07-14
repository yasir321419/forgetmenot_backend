-- AlterTable
ALTER TABLE `Notification` ADD COLUMN `reminderId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_reminderId_fkey` FOREIGN KEY (`reminderId`) REFERENCES `RemiderCategory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
