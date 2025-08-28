const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const prisma = require('../config/prismaConfig');

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

const uploadDir = path.join(__dirname, '../public/uploads');

// Ensure the uploads directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

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

    // Construct base URL dynamically
    const baseUrl = 'http://localhost:4000'; // Adjust this as per your environment, or make it dynamic

    // Step 1: Add all stickers to the "All" category
    for (const sticker of stickers) {
      const sourcePath = path.join(__dirname, '../public/uploads', sticker.name);
      const destPath = path.join(uploadDir, sticker.name);

      if (fs.existsSync(sourcePath)) {
        // Copy the file to the uploads directory
        fs.copyFileSync(sourcePath, destPath);

        // Calculate the hash of the file for integrity check (using SHA256)
        const fileBuffer = fs.readFileSync(destPath);
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

        const encodedFileName = encodeURIComponent(sticker.name); // Encode the filename
        const stickerUrl = `${baseUrl}/public/uploads/${encodedFileName}`;

        // Insert the sticker into the "All" category
        await prisma.sticker.create({
          data: {
            url: stickerUrl,
            hash: hash,
            categoryId: allCategory.id,
            createdById: admin.id,
          },
        });
      } else {
        console.log(`Sticker file "${sticker.name}" does not exist in the source folder.`);
      }
    }

    // Step 2: Distribute the remaining stickers across other categories
    let categoryIndex = 0;
    for (const sticker of stickers) {
      // Skip the stickers already added to the "All" category
      const sourcePath = path.join(__dirname, '../public/uploads', sticker.name);
      const destPath = path.join(uploadDir, sticker.name);

      if (fs.existsSync(sourcePath)) {
        // Copy the file to the uploads directory
        fs.copyFileSync(sourcePath, destPath);

        // Calculate the hash of the file for integrity check (using SHA256)
        const fileBuffer = fs.readFileSync(destPath);
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

        const encodedFileName = encodeURIComponent(sticker.name); // Encode the filename
        const stickerUrl = `${baseUrl}/public/uploads/${encodedFileName}`;

        // Insert the sticker into the current category (evenly distributed)
        await prisma.sticker.create({
          data: {
            url: stickerUrl,
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
