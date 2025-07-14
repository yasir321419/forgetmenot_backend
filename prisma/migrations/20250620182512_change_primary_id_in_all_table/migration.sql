/*
  Warnings:

  - The primary key for the `AboutApp` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Admin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Contacts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `FavoriteContact` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Feedback` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Message` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `MessageStickerCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `MileStoneCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Milestone` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Notification` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `OtherOptionRemiderCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Otp` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `PrivacyPolicy` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `RemiderCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Sticker` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `SubscriptionPlan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `TermsCondition` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserSubscription` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `AboutApp` DROP FOREIGN KEY `AboutApp_createdById_fkey`;

-- DropForeignKey
ALTER TABLE `Contacts` DROP FOREIGN KEY `Contacts_createdById_fkey`;

-- DropForeignKey
ALTER TABLE `FavoriteContact` DROP FOREIGN KEY `FavoriteContact_contactId_fkey`;

-- DropForeignKey
ALTER TABLE `FavoriteContact` DROP FOREIGN KEY `FavoriteContact_createdById_fkey`;

-- DropForeignKey
ALTER TABLE `Message` DROP FOREIGN KEY `Message_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `Message` DROP FOREIGN KEY `Message_createdById_fkey`;

-- DropForeignKey
ALTER TABLE `MessageStickerCategory` DROP FOREIGN KEY `MessageStickerCategory_createdById_fkey`;

-- DropForeignKey
ALTER TABLE `MileStoneCategory` DROP FOREIGN KEY `MileStoneCategory_createdById_fkey`;

-- DropForeignKey
ALTER TABLE `Milestone` DROP FOREIGN KEY `Milestone_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `Milestone` DROP FOREIGN KEY `Milestone_createdById_fkey`;

-- DropForeignKey
ALTER TABLE `Milestone` DROP FOREIGN KEY `Milestone_messageId_fkey`;

-- DropForeignKey
ALTER TABLE `Milestone` DROP FOREIGN KEY `Milestone_reminderId_fkey`;

-- DropForeignKey
ALTER TABLE `Milestone` DROP FOREIGN KEY `Milestone_stickerId_fkey`;

-- DropForeignKey
ALTER TABLE `Notification` DROP FOREIGN KEY `Notification_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Notification` DROP FOREIGN KEY `fk_milestone_id`;

-- DropForeignKey
ALTER TABLE `Notification` DROP FOREIGN KEY `fk_reminder_id`;

-- DropForeignKey
ALTER TABLE `OtherOptionRemiderCategory` DROP FOREIGN KEY `OtherOptionRemiderCategory_createdById_fkey`;

-- DropForeignKey
ALTER TABLE `Otp` DROP FOREIGN KEY `Otp_userId_fkey`;

-- DropForeignKey
ALTER TABLE `PrivacyPolicy` DROP FOREIGN KEY `PrivacyPolicy_createdById_fkey`;

-- DropForeignKey
ALTER TABLE `RemiderCategory` DROP FOREIGN KEY `RemiderCategory_createdById_fkey`;

-- DropForeignKey
ALTER TABLE `Sticker` DROP FOREIGN KEY `Sticker_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `Sticker` DROP FOREIGN KEY `Sticker_createdById_fkey`;

-- DropForeignKey
ALTER TABLE `TermsCondition` DROP FOREIGN KEY `TermsCondition_createdById_fkey`;

-- DropForeignKey
ALTER TABLE `UserSubscription` DROP FOREIGN KEY `UserSubscription_subscriptionPlanId_fkey`;

-- DropForeignKey
ALTER TABLE `UserSubscription` DROP FOREIGN KEY `UserSubscription_userId_fkey`;

-- DropForeignKey
ALTER TABLE `_MilestoneToOtherCategory` DROP FOREIGN KEY `_MilestoneToOtherCategory_A_fkey`;

-- DropForeignKey
ALTER TABLE `_MilestoneToOtherCategory` DROP FOREIGN KEY `_MilestoneToOtherCategory_B_fkey`;

-- DropForeignKey
ALTER TABLE `_MilestoneToOtherOptionRemiderCategory` DROP FOREIGN KEY `_MilestoneToOtherOptionRemiderCategory_A_fkey`;

-- DropForeignKey
ALTER TABLE `_MilestoneToOtherOptionRemiderCategory` DROP FOREIGN KEY `_MilestoneToOtherOptionRemiderCategory_B_fkey`;

-- DropIndex
DROP INDEX `AboutApp_createdById_fkey` ON `AboutApp`;

-- DropIndex
DROP INDEX `Contacts_createdById_fkey` ON `Contacts`;

-- DropIndex
DROP INDEX `FavoriteContact_contactId_fkey` ON `FavoriteContact`;

-- DropIndex
DROP INDEX `FavoriteContact_createdById_fkey` ON `FavoriteContact`;

-- DropIndex
DROP INDEX `Message_categoryId_fkey` ON `Message`;

-- DropIndex
DROP INDEX `Message_createdById_fkey` ON `Message`;

-- DropIndex
DROP INDEX `MessageStickerCategory_createdById_fkey` ON `MessageStickerCategory`;

-- DropIndex
DROP INDEX `MileStoneCategory_createdById_fkey` ON `MileStoneCategory`;

-- DropIndex
DROP INDEX `Milestone_categoryId_fkey` ON `Milestone`;

-- DropIndex
DROP INDEX `Milestone_createdById_fkey` ON `Milestone`;

-- DropIndex
DROP INDEX `Milestone_messageId_fkey` ON `Milestone`;

-- DropIndex
DROP INDEX `Milestone_reminderId_fkey` ON `Milestone`;

-- DropIndex
DROP INDEX `Milestone_stickerId_fkey` ON `Milestone`;

-- DropIndex
DROP INDEX `Notification_userId_fkey` ON `Notification`;

-- DropIndex
DROP INDEX `fk_milestone_id` ON `Notification`;

-- DropIndex
DROP INDEX `fk_reminder_id` ON `Notification`;

-- DropIndex
DROP INDEX `OtherOptionRemiderCategory_createdById_fkey` ON `OtherOptionRemiderCategory`;

-- DropIndex
DROP INDEX `Otp_userId_fkey` ON `Otp`;

-- DropIndex
DROP INDEX `PrivacyPolicy_createdById_fkey` ON `PrivacyPolicy`;

-- DropIndex
DROP INDEX `RemiderCategory_createdById_fkey` ON `RemiderCategory`;

-- DropIndex
DROP INDEX `Sticker_categoryId_fkey` ON `Sticker`;

-- DropIndex
DROP INDEX `Sticker_createdById_fkey` ON `Sticker`;

-- DropIndex
DROP INDEX `TermsCondition_createdById_fkey` ON `TermsCondition`;

-- DropIndex
DROP INDEX `UserSubscription_subscriptionPlanId_fkey` ON `UserSubscription`;

-- DropIndex
DROP INDEX `UserSubscription_userId_fkey` ON `UserSubscription`;

-- AlterTable
ALTER TABLE `AboutApp` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `createdById` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Admin` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Contacts` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `createdById` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `FavoriteContact` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `contactId` VARCHAR(191) NOT NULL,
    MODIFY `createdById` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Feedback` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Message` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `categoryId` VARCHAR(191) NOT NULL,
    MODIFY `createdById` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `MessageStickerCategory` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `createdById` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `MileStoneCategory` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `createdById` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Milestone` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `reminderId` VARCHAR(191) NULL,
    MODIFY `messageId` VARCHAR(191) NULL,
    MODIFY `stickerId` VARCHAR(191) NULL,
    MODIFY `createdById` VARCHAR(191) NOT NULL,
    MODIFY `categoryId` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Notification` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL,
    MODIFY `reminderId` VARCHAR(191) NULL,
    MODIFY `milestoneId` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `OtherOptionRemiderCategory` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `createdById` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Otp` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `PrivacyPolicy` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `createdById` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `RemiderCategory` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `createdById` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Sticker` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `categoryId` VARCHAR(191) NOT NULL,
    MODIFY `createdById` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `SubscriptionPlan` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `TermsCondition` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `createdById` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `UserSubscription` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL,
    MODIFY `subscriptionPlanId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `_MilestoneToOtherCategory` MODIFY `A` VARCHAR(191) NOT NULL,
    MODIFY `B` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `_MilestoneToOtherOptionRemiderCategory` MODIFY `A` VARCHAR(191) NOT NULL,
    MODIFY `B` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Otp` ADD CONSTRAINT `Otp_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AboutApp` ADD CONSTRAINT `AboutApp_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `Admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TermsCondition` ADD CONSTRAINT `TermsCondition_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `Admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PrivacyPolicy` ADD CONSTRAINT `PrivacyPolicy_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `Admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MessageStickerCategory` ADD CONSTRAINT `MessageStickerCategory_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `Admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MileStoneCategory` ADD CONSTRAINT `MileStoneCategory_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `Admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RemiderCategory` ADD CONSTRAINT `RemiderCategory_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `Admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OtherOptionRemiderCategory` ADD CONSTRAINT `OtherOptionRemiderCategory_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `Admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sticker` ADD CONSTRAINT `Sticker_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `MessageStickerCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sticker` ADD CONSTRAINT `Sticker_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `Admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `MessageStickerCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `Admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Milestone` ADD CONSTRAINT `Milestone_messageId_fkey` FOREIGN KEY (`messageId`) REFERENCES `Message`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Milestone` ADD CONSTRAINT `Milestone_stickerId_fkey` FOREIGN KEY (`stickerId`) REFERENCES `Sticker`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Milestone` ADD CONSTRAINT `Milestone_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `MileStoneCategory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Milestone` ADD CONSTRAINT `Milestone_reminderId_fkey` FOREIGN KEY (`reminderId`) REFERENCES `RemiderCategory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Milestone` ADD CONSTRAINT `Milestone_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contacts` ADD CONSTRAINT `Contacts_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FavoriteContact` ADD CONSTRAINT `FavoriteContact_contactId_fkey` FOREIGN KEY (`contactId`) REFERENCES `Contacts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FavoriteContact` ADD CONSTRAINT `FavoriteContact_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `fk_reminder_id` FOREIGN KEY (`reminderId`) REFERENCES `RemiderCategory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `fk_milestone_id` FOREIGN KEY (`milestoneId`) REFERENCES `Milestone`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSubscription` ADD CONSTRAINT `UserSubscription_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSubscription` ADD CONSTRAINT `UserSubscription_subscriptionPlanId_fkey` FOREIGN KEY (`subscriptionPlanId`) REFERENCES `SubscriptionPlan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MilestoneToOtherCategory` ADD CONSTRAINT `_MilestoneToOtherCategory_A_fkey` FOREIGN KEY (`A`) REFERENCES `MileStoneCategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MilestoneToOtherCategory` ADD CONSTRAINT `_MilestoneToOtherCategory_B_fkey` FOREIGN KEY (`B`) REFERENCES `Milestone`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MilestoneToOtherOptionRemiderCategory` ADD CONSTRAINT `_MilestoneToOtherOptionRemiderCategory_A_fkey` FOREIGN KEY (`A`) REFERENCES `Milestone`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MilestoneToOtherOptionRemiderCategory` ADD CONSTRAINT `_MilestoneToOtherOptionRemiderCategory_B_fkey` FOREIGN KEY (`B`) REFERENCES `OtherOptionRemiderCategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
