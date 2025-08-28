const limiter = require("../../middleware/limiter");
const validateRequest = require("../../middleware/validataRequest");


const userNotificationRouter = require("express").Router();
const userNotificationController = require("../../controllers/user/userNotificationController");
const { verifyUserToken } = require("../../middleware/auth");



userNotificationRouter.get(
  "/showAllNotifications",
  verifyUserToken,
  userNotificationController.showAllNotifications
);



userNotificationRouter.get(
  "/onAndOffNotification",
  verifyUserToken,
  userNotificationController.onAndOffNotification
);

module.exports = userNotificationRouter;