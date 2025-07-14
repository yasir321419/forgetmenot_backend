/*
  Warnings:

  - Added the required column `createdById` to the `FavoriteContact` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `FavoriteContact` ADD COLUMN `createdById` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `FavoriteContact` ADD CONSTRAINT `FavoriteContact_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
