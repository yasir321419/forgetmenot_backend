/*
  Warnings:

  - You are about to drop the column `createdById` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `Feedback` table. All the data in the column will be lost.
  - Added the required column `email` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `message` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Feedback` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Feedback` DROP FOREIGN KEY `Feedback_createdById_fkey`;

-- DropIndex
DROP INDEX `Feedback_createdById_fkey` ON `Feedback`;

-- AlterTable
ALTER TABLE `Feedback` DROP COLUMN `createdById`,
    DROP COLUMN `text`,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `message` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `phone` VARCHAR(191) NOT NULL;
