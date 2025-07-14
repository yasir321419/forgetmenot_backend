const limiter = require("../../middleware/limiter");
const validateRequest = require("../../middleware/validataRequest");


const adminMilestoneRouter = require("express").Router();
const adminMilestoneController = require("../../controllers/admin/adminMilestoneController");
const { verifyAdminToken } = require("../../middleware/auth");
const { adminCreateMilestoneCategorySchema, adminEditMilestoneCategorySchema, adminDeleteMilestoneCategorySchema, adminCreateOtherMilestoneCategorySchema, adminDeleteOtherMilestoneCategorySchema, adminCreateReminderMilestoneCategorySchema, adminEditReminderMilestoneCategorySchema, adminDeleteReminderMilestoneCategorySchema, adminEditOtherMilestoneCategorySchema } = require("../../schema/admin/milestone");

adminMilestoneRouter.post(
  "/createMilestoneCategory",
  limiter,
  verifyAdminToken,
  validateRequest(adminCreateMilestoneCategorySchema),
  adminMilestoneController.createMilestoneCategory
);

adminMilestoneRouter.get(
  "/showMilestoneCategory",
  limiter,
  verifyAdminToken,
  adminMilestoneController.showMilestoneCategory
);

adminMilestoneRouter.put(
  "/editMilestoneCategory/:categoryId",
  limiter,
  verifyAdminToken,
  validateRequest(adminEditMilestoneCategorySchema),
  adminMilestoneController.editMilestoneCategory
);

adminMilestoneRouter.delete(
  "/deleteMilestoneCategory/:categoryId",
  limiter,
  verifyAdminToken,
  validateRequest(adminDeleteMilestoneCategorySchema),
  adminMilestoneController.deleteMilestoneCategory
);

adminMilestoneRouter.post(
  "/createOtherMilestoneOption",
  limiter,
  verifyAdminToken,
  validateRequest(adminCreateOtherMilestoneCategorySchema),
  adminMilestoneController.createOtherMilestoneOption
);

adminMilestoneRouter.get(
  "/showOtherMilestoneOption",
  limiter,
  verifyAdminToken,
  adminMilestoneController.showOtherMilestoneOption
);

adminMilestoneRouter.put(
  "/editOtherMilestoneOption/:otherCategoryId",
  limiter,
  verifyAdminToken,
  validateRequest(adminEditOtherMilestoneCategorySchema),
  adminMilestoneController.editOtherMilestoneOption
);

adminMilestoneRouter.delete(
  "/deleteOtherMilestoneOption/:otherCategoryId",
  limiter,
  verifyAdminToken,
  validateRequest(adminDeleteOtherMilestoneCategorySchema),
  adminMilestoneController.deleteOtherMilestoneOption
);


adminMilestoneRouter.post(
  "/createReminderOption",
  limiter,
  verifyAdminToken,
  validateRequest(adminCreateReminderMilestoneCategorySchema),
  adminMilestoneController.createReminderOption
);

adminMilestoneRouter.get(
  "/showReminderOption",
  limiter,
  verifyAdminToken,
  adminMilestoneController.showReminderOption
);

adminMilestoneRouter.put(
  "/editReminderOption/:reminderCategoryId",
  limiter,
  verifyAdminToken,
  validateRequest(adminEditReminderMilestoneCategorySchema),
  adminMilestoneController.editReminderOption
);

adminMilestoneRouter.delete(
  "/deleteReminderOption/:reminderCategoryId",
  limiter,
  verifyAdminToken,
  validateRequest(adminDeleteReminderMilestoneCategorySchema),
  adminMilestoneController.deleteReminderOption
);



module.exports = adminMilestoneRouter;