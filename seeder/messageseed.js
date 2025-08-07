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

    // Get the categories
    const categories = await prisma.messageStickerCategory.findMany();

    // Ensure only 25 messages are used (already done)
    const messagesToAdd = messages.slice(0, 25);

    // Calculate the number of messages to distribute across categories
    const messagesPerCategory = Math.floor(messagesToAdd.length / categories.length);
    const remainder = messagesToAdd.length % categories.length;

    let messageIndex = 0;

    // Loop through each category
    for (let i = 0; i < categories.length; i++) {
      // Calculate how many messages to assign to this category
      const messagesForThisCategory = i < remainder ? messagesPerCategory + 1 : messagesPerCategory;

      for (let j = 0; j < messagesForThisCategory; j++) {
        if (messageIndex >= messagesToAdd.length) break;

        const messageTextNormalized = messagesToAdd[messageIndex].trim().toLowerCase();

        // Perform the upsert operation with a unique check for each category and message
        await prisma.message.upsert({
          where: {
            text_categoryId: {
              text: messageTextNormalized,  // Unique check for text
              categoryId: categories[i].id, // Unique check for categoryId
            },
          },
          update: {},  // No update if the message exists
          create: {
            text: messageTextNormalized,
            categoryId: categories[i].id,
            createdById: categories[i].createdById,
          },
        });

        messageIndex++; // Move to the next message
      }
    }

  } catch (error) {
    console.log("Error seeding messages:", error);
  }
};

module.exports = messageSeed;
