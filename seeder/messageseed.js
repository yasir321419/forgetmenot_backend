
const prisma = require("../config/prismaConfig");

const messageSeed = async () => {
  try {
    const messages = [
      "Your kindness today may be the reason someone breathes easier.",
      "Small gestures hold enormous power.",
      "Remembering matters.",
      "You don’t need the perfect words. Your presence is enough.",
      "This moment of care may mean more than you know.",
      "Grief is quieter when people feel seen.",
      "You can’t fix the pain, but you can soften it with love.",
      "Thank you for honouring someone else’s grief.",
      "You are turning compassion into something tangible.",
      "You remembered when others may have forgotten. That’s beautiful.",
      "Kindness, on a hard day, can change everything.",
      "Grief doesn’t vanish, but care helps carry it.",
      "Your messages are more than kind. They are healing.",
      "Sometimes just showing up is the most powerful thing you can do.",
      "This app may remind you, but it’s your heart that makes the difference.",
      "You’re doing sacred work by remembering others.",
      "Empathy is a skill. You’re practicing it beautifully.",
      "You made room for grief today. Thank you.",
      "Sometimes the quietest gestures leave the deepest imprint.",
      "Grief doesn’t disappear, but it softens in good company.",
      "You are helping people feel held in a moment of ache.",
      "You are choosing to reach out instead of looking away. That matters.",
      "You’re not just sending messages, you’re making meaning.",
      "Every act of remembrance is an act of love.",
      "You don’t need to be a grief expert to be a good friend.",
      "Your care ripples farther than you think.",
      "You’re the kind of person the world needs more of.",
      "Grief is personal, but it doesn’t have to be lonely."
    ];

    // Categories to create (hardcoded list, you can add more categories as needed)
    const categoriesToCreate = [
      { name: 'Wedding' },
      { name: 'Birthday' },
      { name: 'All' },
      { name: 'Holiday' },
      { name: 'Death Anninversary' },
      { name: 'Retirement' },
      { name: 'Fundraiser' }
    ];

    // Fetch the admin dynamically by email
    const email = "admin@example.com"; // Replace this with the actual admin email
    const admin = await prisma.admin.findUnique({
      where: {
        email: email, // Fetching admin by email
      },
    });

    if (!admin) {
      console.log(`Admin with email '${email}' not found!`);
      return; // Stop execution if admin is not found
    }

    const adminId = admin.id; // Get the admin's ID

    // Loop through each category to create it if it doesn't exist
    for (const categoryData of categoriesToCreate) {
      const existingCategory = await prisma.messageStickerCategory.findFirst({
        where: {
          name: categoryData.name, // Searching by name
        },
      });

      // Create the category if it does not exist
      if (!existingCategory) {
        await prisma.messageStickerCategory.create({
          data: {
            name: categoryData.name,
            createdById: adminId,  // Use the dynamically fetched adminId
          },
        });

        console.log(`Category '${categoryData.name}' created.`);
      }
    }

    // Get all categories after creation
    const categories = await prisma.messageStickerCategory.findMany();

    // Ensure only 25 messages are used
    const messagesToAdd = messages.slice(0, 25);

    // Find the "ALL" category to add all messages
    const allCategory = categories.find(category => category.name === 'All');

    // Loop through each category
    for (let i = 0; i < categories.length; i++) {
      // For "ALL" category, add all 25 messages
      if (categories[i].name === 'All') {
        for (let j = 0; j < messagesToAdd.length; j++) {
          const messageTextNormalized = messagesToAdd[j].trim().toLowerCase();

          // Upsert operation for "ALL" category
          await prisma.message.upsert({
            where: {
              text_categoryId: {
                text: messageTextNormalized,
                categoryId: categories[i].id, // Unique check for ALL category
              },
            },
            update: {},
            create: {
              text: messageTextNormalized,
              categoryId: categories[i].id,
              createdById: adminId, // Set createdById dynamically
            },
          });
        }
      } else {
        // For other categories, distribute messages equally
        const messagesForCategory = Math.floor(messagesToAdd.length / (categories.length - 1));  // Exclude "All" category
        let messageIndex = 0;

        // Loop to assign remaining messages to other categories
        for (let j = 0; j < messagesForCategory; j++) {
          if (messageIndex >= messagesToAdd.length) break;

          const messageTextNormalized = messagesToAdd[messageIndex].trim().toLowerCase();

          await prisma.message.upsert({
            where: {
              text_categoryId: {
                text: messageTextNormalized,
                categoryId: categories[i].id, // Unique check for current category
              },
            },
            update: {},
            create: {
              text: messageTextNormalized,
              categoryId: categories[i].id,
              createdById: adminId, // Set createdById dynamically
            },
          });

          messageIndex++; // Move to the next message
        }
      }
    }

  } catch (error) {
    console.log("Error seeding messages:", error);
  }
};

module.exports = messageSeed;


