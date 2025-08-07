/*
  Warnings:

  - A unique constraint covering the columns `[text,categoryId]` on the table `Message` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Message_text_categoryId_key` ON `Message`(`text`, `categoryId`);
