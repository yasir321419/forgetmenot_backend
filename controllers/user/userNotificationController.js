const prisma = require("../../config/prismaConfig");
const { NotFoundError, ValidationError } = require("../../handler/CustomError");
const { handlerOk } = require("../../handler/resHandler");

const showAllNotifications = async (req, res, next) => {
  try {
    const { id } = req.user;

    const notifications = await prisma.notification.findMany({
      where: {
        userId: id,
      },
      include: {
        user:
        {
          select: {
            firstName: true,
            image: true
          }
        }
      }
    });

    if (notifications.length === 0) {
      throw new NotFoundError("notifications not found")
    }

    handlerOk(res, 200, notifications, "notifications found succcessfully")
  } catch (error) {
    next(error)
  }
}

const readNotification = async (req, res, next) => {
  try {
    const { id } = req.user;

    const { notificationId } = req.params;

    const findnotification = await prisma.notification.findFirst({
      where: {
        id: notificationId,
        userId: id
      }
    });

    if (!findnotification) {
      throw new NotFoundError("notification not found")
    }

    const readnotification = await prisma.notification.update({
      where: {
        id: findnotification.id,
        userId: id
      },
      data: {
        isRead: true
      }
    });

    if (!readnotification) {
      throw new ValidationError("notification not read")
    }

    handlerOk(res, 200, readnotification, "notification read successfully")
  } catch (error) {
    next(error)
  }
}

const onAndOffNotification = async (req, res, next) => {
  try {
    let { notificationOnAndOff, id } = req.user;

    notificationOnAndOff = !notificationOnAndOff;

    let message = notificationOnAndOff
      ? "Notification On Successfully"
      : "Notification Off Successfully";

    await prisma.user.update({
      where: {
        id: id
      },
      data: {
        notificationOnAndOff: notificationOnAndOff
      }
    })

    handlerOk(res, 200, null, message)

  } catch (error) {
    next(error)
  }
}

module.exports = {
  showAllNotifications,
  readNotification,
  onAndOffNotification
}