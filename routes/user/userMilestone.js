const limiter = require("../../middleware/limiter");
const validateRequest = require("../../middleware/validataRequest");


const userMilestoneRouter = require("express").Router();
const userMilestoneController = require("../../controllers/user/userMilestoneController");
const { verifyUserToken } = require("../../middleware/auth");
const { userCreateMilestoneSchema, userEditMilestoneSchema, userShowMilestoneSchemaByDayWeekMonthYear, userSendMilestoneToNumberSchema } = require("../../schema/user/milestone");

userMilestoneRouter.get(
  "/showMileStoneCategory",
  limiter,
  verifyUserToken,
  userMilestoneController.showMileStoneCategory
);

userMilestoneRouter.get(
  "/showOtherMilestoneCategory",
  limiter,
  verifyUserToken,
  userMilestoneController.showOtherMilestoneCategory
);

userMilestoneRouter.get(
  "/showReminderCategory",
  limiter,
  verifyUserToken,
  userMilestoneController.showReminderCategory
);

userMilestoneRouter.post(
  "/createMilestone",
  limiter,
  verifyUserToken,
  validateRequest(userCreateMilestoneSchema),
  userMilestoneController.createMilestone
);

userMilestoneRouter.get(
  "/showAllMilestone",
  limiter,
  verifyUserToken,
  userMilestoneController.showAllMilestone
);

userMilestoneRouter.put(
  "/editMilestone/:milestoneId",
  limiter,
  verifyUserToken,
  validateRequest(userEditMilestoneSchema),
  userMilestoneController.editMilestone
);

userMilestoneRouter.post(
  "/sendMilestoneToNumber/:milestoneId",
  limiter,
  verifyUserToken,
  validateRequest(userSendMilestoneToNumberSchema),
  userMilestoneController.sendMilestoneToNumber
);

userMilestoneRouter.get(
  "/todayReminders",
  limiter,
  verifyUserToken,
  userMilestoneController.todayReminders
);

userMilestoneRouter.get(
  "/showMilestoneByDayWeekMonthYearly",
  limiter,
  verifyUserToken,
  validateRequest(userShowMilestoneSchemaByDayWeekMonthYear),
  userMilestoneController.showMilestoneByDayWeekMonthYearly
);

module.exports = userMilestoneRouter;