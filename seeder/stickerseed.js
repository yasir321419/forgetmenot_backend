const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const prisma = require('../config/prismaConfig'); // Assuming you have Prisma set up for your project

// Sticker files to seed (with filenames, categories will be fetched from DB dynamically)
const stickers = [
  { name: 'Frame 1171275914.png' },
  { name: 'Frame 1171275912.png' },
  { name: 'Frame 1171275911.png' },
  { name: 'Frame 1171275908.png' },
  { name: 'Frame 1171275906.png' },
  { name: 'Frame 1171275905.png' },
  { name: 'Frame 1171275904.png' },
  { name: 'Frame 1171275901.png' },
  { name: 'Frame 1171275895.png' },
  { name: 'Frame 1171275891.png' }
];

// Directory where stickers will be uploaded
const uploadDir = path.join(__dirname, '../public/uploads');

// Ensure the uploads directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Sticker Seeding Function
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
      where: { name: 'All' },
    });

    if (!allCategory) {
      console.log('All category not found.');
      return;
    }

    // Construct base URL dynamically (replace 'localhost:4000' with the actual host in production)
    const baseUrl = 'http://localhost:4000'; // Adjust this as per your environment, or make it dynamic

    // Loop through stickers and add them to the "All" category
    for (const sticker of stickers) {
      const sourcePath = path.join(__dirname, '../public/uploads', sticker.name); // Path to source file
      const destPath = path.join(uploadDir, sticker.name); // Destination path in uploads folder


      // Check if the sticker file exists in the source folder
      if (fs.existsSync(sourcePath)) {
        // Copy the file to the uploads directory
        fs.copyFileSync(sourcePath, destPath);

        // Calculate the hash of the file for integrity check (using SHA256)
        const fileBuffer = fs.readFileSync(destPath);
        const hash = crypto.createHash('sha256').update(fileBuffer).digest('hex');

        // Fetch the Admin ID dynamically (replace with actual admin email or logic)
        const admin = await prisma.admin.findUnique({
          where: {
            email: 'admin@example.com', // Replace with the actual admin email or fetch dynamically
          },
        });

        if (!admin) {
          console.log('Admin not found.');
          continue; // Skip if the admin doesn't exist in the database
        }

        // Create the URL for the sticker with base path and encode the file name
        const encodedFileName = encodeURIComponent(sticker.name); // Encode the filename to handle spaces
        const stickerUrl = `${baseUrl}/public/uploads/${encodedFileName}`;

        // Insert the sticker into the "All" category
        await prisma.sticker.create({
          data: {
            url: stickerUrl,  // URL of the uploaded file (full URL path)
            hash: hash,  // File hash for integrity check
            categoryId: allCategory.id,  // Associated 'All' category ID
            createdById: admin.id,  // Admin ID of the creator
          },
        });

      } else {
        console.log(`Sticker file "${sticker.name}" does not exist in the source folder.`);
      }
    }

    // Distribute the remaining stickers across the other categories
    let categoryIndex = 0;
    for (const sticker of stickers) {
      // Skip adding stickers to 'All' category
      if (sticker.name === 'Frame 1171275914.png') continue; // Assuming this sticker is for 'All'

      const sourcePath = path.join(__dirname, '../public/uploads', sticker.name);
      const destPath = path.join(uploadDir, sticker.name);

      // Log the source path for debugging

      // Check if the sticker file exists in the source folder
      if (fs.existsSync(sourcePath)) {
        // Copy the file to the uploads directory
        fs.copyFileSync(sourcePath, destPath);

        // Calculate the hash of the file for integrity check (using SHA256)
        const fileBuffer = fs.readFileSync(destPath);
        const hash = crypto.createHash('sha256').update(fileBuffer).digest('hex');

        // Fetch the Admin ID dynamically (replace with actual admin email or logic)
        const admin = await prisma.admin.findUnique({
          where: {
            email: 'admin@example.com', // Replace with the actual admin email or fetch dynamically
          },
        });

        if (!admin) {
          console.log('Admin not found.');
          continue; // Skip if the admin doesn't exist in the database
        }

        // Create the URL for the sticker with base path and encode the file name
        const encodedFileName = encodeURIComponent(sticker.name); // Encode the filename to handle spaces
        const stickerUrl = `${baseUrl}/public/uploads/${encodedFileName}`;

        // Insert the sticker into the current category
        await prisma.sticker.create({
          data: {
            url: stickerUrl,  // URL of the uploaded file (full URL path)
            hash: hash,  // File hash for integrity check
            categoryId: categories[categoryIndex].id,  // Distribute across other categories
            createdById: admin.id,  // Admin ID of the creator
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

// Run the seeding process
stickerSeed();  // Call stickerSeed directly

module.exports = stickerSeed;
