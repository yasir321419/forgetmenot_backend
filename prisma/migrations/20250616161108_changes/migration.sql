/*
  Warnings:

  - You are about to alter the column `name` on the `MileStoneCategory` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `MileStoneCategory` MODIFY `name` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `OtherOptionRemiderCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdById` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_MilestoneToOtherOptionRemiderCategory` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_MilestoneToOtherOptionRemiderCategory_AB_unique`(`A`, `B`),
    INDEX `_MilestoneToOtherOptionRemiderCategory_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `OtherOptionRemiderCategory` ADD CONSTRAINT `OtherOptionRemiderCategory_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `Admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MilestoneToOtherOptionRemiderCategory` ADD CONSTRAINT `_MilestoneToOtherOptionRemiderCategory_A_fkey` FOREIGN KEY (`A`) REFERENCES `Milestone`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MilestoneToOtherOptionRemiderCategory` ADD CONSTRAINT `_MilestoneToOtherOptionRemiderCategory_B_fkey` FOREIGN KEY (`B`) REFERENCES `OtherOptionRemiderCategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
