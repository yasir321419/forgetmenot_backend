
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const prisma = require('../config/prismaConfig');
const uploadFileWithFolder = require('../utils/s3Uploads');
require('dotenv').config();

// Assuming you have Prisma set up for your project
const stickers = [
  { name: '1.png' },
  { name: '2.png' },
  { name: '3.png' },
  { name: '4.png' },
  { name: '5.png' },
  { name: '6.png' },
  { name: '7.png' },
  { name: '8.png' },
];

// Step 1: Seeding stickers in AWS
const stickerSeed = async () => {
  try {
    // Fetch categories from the database
    const categories = await prisma.messageStickerCategory.findMany({
      where: {
        name: {
          not: 'All', // Exclude the 'All' category for now
        },
      },
    });

    // Fetch the 'All' category separately (since we want to add all stickers to this category)
    const allCategory = await prisma.messageStickerCategory.findFirst({
      where: {
        name: 'All',
      },
    });

    if (!allCategory) {
      console.log('All category not found.');
      return;
    }

    // Use the S3_ACCESS_URL from environment variable for your base URL
    const baseUrl = process.env.S3_ACCESS_URL; // https://forgetmenotbucket.s3.ca-central-1.amazonaws.com

    // Step 2: Add all stickers to the "All" category
    const stickerURLs = [];
    for (const sticker of stickers) {
      const sourcePath = path.join(__dirname, '../public/uploads', sticker.name);

      if (fs.existsSync(sourcePath)) {
        // Read the file buffer
        const fileBuffer = fs.readFileSync(sourcePath);

        // Upload the file to S3
        const s3ImageUrl = await uploadFileWithFolder(fileBuffer, sticker.name, 'image/png', 'stickers');

        // Calculate the hash of the file for integrity check (using SHA256)
        const hash = crypto.createHash('sha256').update(fileBuffer).digest('hex');

        const admin = await prisma.admin.findUnique({
          where: {
            email: 'admin@example.com', // Replace with the actual admin email or fetch dynamically
          },
        });

        if (!admin) {
          console.log('Admin not found.');
          continue;
        }

        // Insert the sticker into the "All" category
        await prisma.sticker.create({
          data: {
            url: s3ImageUrl, // This URL comes from the upload function
            hash: hash,
            categoryId: allCategory.id,
            createdById: admin.id,
          },
        });

        // Save the sticker URL for distribution later
        stickerURLs.push(s3ImageUrl);
      } else {
        console.log(`Sticker file "${sticker.name}" does not exist in the source folder.`);
      }
    }

    // Step 3: Distribute the remaining stickers across other categories
    let categoryIndex = 0;
    for (const sticker of stickers) {
      const sourcePath = path.join(__dirname, '../public/uploads', sticker.name);

      // Skip stickers that were already added to the "All" category
      if (stickerURLs.includes(sticker.name)) {
        continue; // Skip this sticker, already added to the "All" category
      }

      if (fs.existsSync(sourcePath)) {
        // Read the file buffer
        const fileBuffer = fs.readFileSync(sourcePath);

        // Upload the file to S3
        const s3ImageUrl = await uploadFileWithFolder(fileBuffer, sticker.name, 'image/png', 'stickers');

        // Calculate the hash of the file for integrity check (using SHA256)
        const hash = crypto.createHash('sha256').update(fileBuffer).digest('hex');

        const admin = await prisma.admin.findUnique({
          where: {
            email: 'admin@example.com', // Replace with the actual admin email or fetch dynamically
          },
        });

        if (!admin) {
          console.log('Admin not found.');
          continue;
        }

        // Insert the sticker into the current category (evenly distributed)
        await prisma.sticker.create({
          data: {
            url: s3ImageUrl, // This URL comes from the upload function
            hash: hash,
            categoryId: categories[categoryIndex].id,
            createdById: admin.id,
          },
        });

        // Cycle through the categories for the next sticker
        categoryIndex = (categoryIndex + 1) % categories.length;
      } else {
        console.log(`Sticker file "${sticker.name}" does not exist in the source folder.`);
      }
    }
  } catch (error) {
    console.error('Error seeding sticker files:', error);
  }
};

// Call stickerSeed directly
module.exports = stickerSeed;

