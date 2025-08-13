const limiter = require("../../middleware/limiter");
const validateRequest = require("../../middleware/validataRequest");


const userContentRouter = require("express").Router();
const userContentController = require("../../controllers/user/userContentController");
const { verifyUserToken } = require("../../middleware/auth");
const { userFeedbackSchema } = require("../../schema/user/feedback");

userContentRouter.get(
  "/showPrivacyPolicy",
  // limiter,
  verifyUserToken,
  userContentController.showPrivacyPolicy
);

userContentRouter.get(
  "/showTermsCondition",
  // limiter,
  verifyUserToken,
  userContentController.showTermsCondition
);

userContentRouter.get(
  "/showAboutApp",
  // limiter,
  verifyUserToken,
  userContentController.showAboutApp
);

userContentRouter.post(
  "/submitFeedBack",
  // limiter,
  verifyUserToken,
  validateRequest(userFeedbackSchema),
  userContentController.submitFeedBack
);

module.exports = userContentRouter;
