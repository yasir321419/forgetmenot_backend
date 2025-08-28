const limiter = require("../../middleware/limiter");
const validateRequest = require("../../middleware/validataRequest");


const userMilestoneRouter = require("express").Router();
const userMilestoneController = require("../../controllers/user/userMilestoneController");
const { verifyUserToken } = require("../../middleware/auth");
const { userCreateMilestoneSchema, userEditMilestoneSchema, userShowMilestoneSchemaByDayWeekMonthYear, userSendMilestoneToNumberSchema } = require("../../schema/user/milestone");

userMilestoneRouter.get(
  "/showMileStoneCategory",
  verifyUserToken,
  userMilestoneController.showMileStoneCategory
);

userMilestoneRouter.get(
  "/showOtherMilestoneCategory",
  verifyUserToken,
  userMilestoneController.showOtherMilestoneCategory
);

userMilestoneRouter.get(
  "/showReminderCategory",
  verifyUserToken,
  userMilestoneController.showReminderCategory
);

userMilestoneRouter.post(
  "/createMilestone",
  verifyUserToken,
  validateRequest(userCreateMilestoneSchema),
  userMilestoneController.createMilestone
);

userMilestoneRouter.get(
  "/showAllMilestone",
  verifyUserToken,
  userMilestoneController.showAllMilestone
);

userMilestoneRouter.put(
  "/editMilestone/:milestoneId",
  verifyUserToken,
  validateRequest(userEditMilestoneSchema),
  userMilestoneController.editMilestone
);

userMilestoneRouter.post(
  "/sendMilestoneToNumber/:milestoneId",
  verifyUserToken,
  validateRequest(userSendMilestoneToNumberSchema),
  userMilestoneController.sendMilestoneToNumber
);

userMilestoneRouter.get(
  "/todayReminders",
  verifyUserToken,
  userMilestoneController.todayReminders
);

userMilestoneRouter.get(
  "/showMilestoneByDayWeekMonthYearly",
  verifyUserToken,
  validateRequest(userShowMilestoneSchemaByDayWeekMonthYear),
  userMilestoneController.showMilestoneByDayWeekMonthYearly
);

module.exports = userMilestoneRouter;