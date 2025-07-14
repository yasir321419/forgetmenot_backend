/*
  Warnings:

  - You are about to drop the column `category` on the `Milestone` table. All the data in the column will be lost.
  - You are about to drop the `_MileStoneCategoryToMilestone` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_MileStoneCategoryToMilestone` DROP FOREIGN KEY `_MileStoneCategoryToMilestone_A_fkey`;

-- DropForeignKey
ALTER TABLE `_MileStoneCategoryToMilestone` DROP FOREIGN KEY `_MileStoneCategoryToMilestone_B_fkey`;

-- AlterTable
ALTER TABLE `Milestone` DROP COLUMN `category`,
    ADD COLUMN `categoryId` INTEGER NULL;

-- DropTable
DROP TABLE `_MileStoneCategoryToMilestone`;

-- CreateTable
CREATE TABLE `_MilestoneToOtherCategory` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_MilestoneToOtherCategory_AB_unique`(`A`, `B`),
    INDEX `_MilestoneToOtherCategory_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Milestone` ADD CONSTRAINT `Milestone_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `MileStoneCategory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MilestoneToOtherCategory` ADD CONSTRAINT `_MilestoneToOtherCategory_A_fkey` FOREIGN KEY (`A`) REFERENCES `MileStoneCategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MilestoneToOtherCategory` ADD CONSTRAINT `_MilestoneToOtherCategory_B_fkey` FOREIGN KEY (`B`) REFERENCES `Milestone`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
