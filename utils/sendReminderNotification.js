const prisma = require("../config/prismaConfig");
const dayjs = require("dayjs");
const sendNotification = require("./notification");

// ✅ No more UTC plugin needed — using local time

const checkAndSendReminderNotifications = async () => {
  try {
    const milestones = await prisma.milestone.findMany({
      include: {
        reminder: true,
        createdBy: true
      }
    });

    // ✅ Use local date (00:00 of current day)
    const now = dayjs().startOf("day");

    for (const milestone of milestones) {
      const eventDate = dayjs(milestone.date).startOf("day");
      const reminderName = milestone.reminder?.name?.toLowerCase();
      const user = milestone.createdBy;
      if (!reminderName) continue;

      let reminderDate;

      // Map reminder type to offset days
      switch (reminderName) {
        case "1 day before the event":
          reminderDate = eventDate.subtract(1, "day");
          break;
        case "2 day before the event":
          reminderDate = eventDate.subtract(2, "day");
          break;
        case "1 week before the event":
          reminderDate = eventDate.subtract(1, "week");
          break;
        case "day of the event":
        case "on the day of the event":
          reminderDate = eventDate;
          break;
        default:
          continue; // Unknown reminder
      }

      if (reminderDate.isSame(now, "day")) {
        const alreadySent = await prisma.notification.findFirst({
          where: {
            userId: milestone.createdById,
            title: milestone.title,
            description: milestone.reminder.name,
            milestoneId: milestone.id,
            reminderId: milestone.reminderId
          }
        });

        if (!alreadySent) {
          await prisma.notification.create({
            data: {
              userId: milestone.createdById,
              title: milestone.title,
              description: milestone.reminder.name,
              reminderId: milestone.reminderId,
              milestoneId: milestone.id
            }
          });

          // 2. Send push notification (if deviceToken exists)
          if (user?.deviceToken) {
            try {
              await sendNotification(
                milestone.createdById,
                user.deviceToken,
                milestone.title,
                milestone.milestone.reminder.name
              );
            } catch (pushErr) {
              console.warn("⚠️ Push notification error:", pushErr.message);
            }
          }


          console.log(`✅ Notification sent for milestone: ${milestone.title}`);
        } else {
          console.log(`ℹ️ Notification already sent for: ${milestone.title}`);
        }
      } else {
        console.log(`⏩ Skipped: ${milestone.title} (Not matching today)`);
      }
    }
  } catch (error) {
    console.error("❌ Error sending milestone notifications:", error.message);
  }
};

module.exports = checkAndSendReminderNotifications;
