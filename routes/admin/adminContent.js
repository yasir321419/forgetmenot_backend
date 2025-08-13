const limiter = require("../../middleware/limiter");
const validateRequest = require("../../middleware/validataRequest");


const adminContentRouter = require("express").Router();
const adminContentController = require("../../controllers/admin/adminContentController");
const { adminCreatePrivacyPolicySchema, adminCreateTermsConditionSchema, adminUpdatePrivacyPolicySchema, adminUpdateTermsConditionSchema, adminCreateAboutAppSchema, adminUpdateAboutAppSchema } = require("../../schema/admin/content");
const { verifyAdminToken } = require("../../middleware/auth");

adminContentRouter.get(
  "/showAllUsers",
  // limiter,
  verifyAdminToken,
  adminContentController.showAllUsers
);

adminContentRouter.get(
  "/countUsers",
  // limiter,
  verifyAdminToken,
  adminContentController.countUsers
);

adminContentRouter.get(
  "/androidUsers",
  // limiter,
  verifyAdminToken,
  adminContentController.androidUsers
);

adminContentRouter.get(
  "/iosUsers",
  // limiter,
  verifyAdminToken,
  adminContentController.iosUsers
);

adminContentRouter.post(
  "/createPrivacyPolicy",
  // limiter,
  verifyAdminToken,
  validateRequest(adminCreatePrivacyPolicySchema),
  adminContentController.createPrivacyPolicy
);

adminContentRouter.get(
  "/showPrivacyPolicy",
  // limiter,
  verifyAdminToken,
  adminContentController.showPrivacyPolicy
);

adminContentRouter.put(
  "/updatePrivacyPolicy/:privacyId",
  // limiter,
  verifyAdminToken,
  validateRequest(adminUpdatePrivacyPolicySchema),
  adminContentController.updatePrivacyPolicy
);

adminContentRouter.post(
  "/createTermsCondition",
  // limiter,
  verifyAdminToken,
  validateRequest(adminCreateTermsConditionSchema),
  adminContentController.createTermsCondition
);

adminContentRouter.get(
  "/showTermsCondition",
  // limiter,
  verifyAdminToken,
  adminContentController.showTermsCondition
);

adminContentRouter.put(
  "/updateTermsCondition/:termsId",
  // limiter,
  verifyAdminToken,
  validateRequest(adminUpdateTermsConditionSchema),
  adminContentController.updateTermsCondition
);

adminContentRouter.post(
  "/createAboutApp",
  // limiter,
  verifyAdminToken,
  validateRequest(adminCreateAboutAppSchema),
  adminContentController.createAboutApp
);

adminContentRouter.get(
  "/showAboutApp",
  // limiter,
  verifyAdminToken,
  adminContentController.showAboutApp
);

adminContentRouter.put(
  "/updateAboutApp/:aboutappId",
  // limiter,
  verifyAdminToken,
  validateRequest(adminUpdateAboutAppSchema),
  adminContentController.updateAboutApp
);

adminContentRouter.get(
  "/showUsersFeedBack",
  // limiter,
  verifyAdminToken,
  adminContentController.showUsersFeedBack
);



module.exports = adminContentRouter;