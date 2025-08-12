const prisma = require("../config/prismaConfig");

const reminderCategory = async () => {
  try {
    // Categories to create (hardcoded list)
    const categoriesToCreate = [
      { name: 'Day of the event' },
      { name: '01 Day before the event' },
      { name: '02 Days before the event' },
      { name: '03 Days before the event' },
      { name: '01 Week before the event' },
    ];

    // Fetch the admin dynamically by email
    const email = "admin@example.com"; // Replace with the actual admin email
    const admin = await prisma.admin.findUnique({
      where: {
        email: email, // Fetching admin by email
      },
    });

    if (!admin) {
      console.log(`Admin with email '${email}' not found!`);
      return; // Stop execution if admin is not found
    }

    const adminId = admin.id; // Use the admin's ID

    // Loop through each category to create it if it doesn't exist
    for (const categoryData of categoriesToCreate) {
      const existingCategory = await prisma.remiderCategory.findFirst({
        where: {
          name: categoryData.name, // Searching by name
        },
      });

      // Create the category if it does not exist
      if (!existingCategory) {
        await prisma.remiderCategory.create({
          data: {
            name: categoryData.name,
            createdById: adminId,  // Use the dynamically fetched adminId
          },
        });

        console.log(`Category '${categoryData.name}' created.`);
      }
    }


  } catch (error) {
    console.log("Error seeding categories:", error);
  }
};

module.exports = reminderCategory;
