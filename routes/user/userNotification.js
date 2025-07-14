const limiter = require("../../middleware/limiter");
const validateRequest = require("../../middleware/validataRequest");


const userNotificationRouter = require("express").Router();
const userNotificationController = require("../../controllers/user/userNotificationController");
const { verifyUserToken } = require("../../middleware/auth");
const { userReadNotificationSchema } = require("../../schema/user/notification");



userNotificationRouter.get(
  "/showAllNotifications",
  limiter,
  verifyUserToken,
  userNotificationController.showAllNotifications
);

userNotificationRouter.put(
  "/readNotification/:notificationId",
  limiter,
  verifyUserToken,
  validateRequest(userReadNotificationSchema),
  userNotificationController.readNotification
);

userNotificationRouter.get(
  "/onAndOffNotification",
  limiter,
  verifyUserToken,
  userNotificationController.onAndOffNotification
);

module.exports = userNotificationRouter;