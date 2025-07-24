const limiter = require("../../middleware/limiter");
const validateRequest = require("../../middleware/validataRequest");


const userAuthRouter = require("express").Router();
const userAuthController = require("../../controllers/user/userAuthController");
const { userRegisterSchema, userVerifyOtpSchema, userForgetPasswordSchema, userLoginSchema, userResendOtpSchema, resetPasswordSchema, changePasswordSchema, editProfileSchema, socialLoginSchema, userCreatedProfileSchema } = require("../../schema/user/auth");
const { verifyUserToken } = require("../../middleware/auth");
const handleMultiPartData = require("../../middleware/multiPartData");

userAuthRouter.post(
  "/SignUp",
  limiter,
  validateRequest(userRegisterSchema),
  userAuthController.SignUp
);

userAuthRouter.post(
  "/VerifyOtp",
  limiter,
  validateRequest(userVerifyOtpSchema),
  userAuthController.VerifyOtp
);

userAuthRouter.post(
  "/forgetPassword",
  limiter,
  validateRequest(userForgetPasswordSchema),
  userAuthController.forgetPassword
);

userAuthRouter.post(
  "/resendOtp",
  limiter,
  validateRequest(userResendOtpSchema),
  userAuthController.resendOtp
);

userAuthRouter.post(
  "/createdProfile",
  limiter,
  verifyUserToken,
  validateRequest(userCreatedProfileSchema),
  userAuthController.createdProfile
);

userAuthRouter.post(
  "/Login",
  limiter,
  validateRequest(userLoginSchema),
  userAuthController.Login
);

userAuthRouter.post(
  "/resetPassword",
  limiter,
  verifyUserToken,
  validateRequest(resetPasswordSchema),
  userAuthController.resetPassword
);

userAuthRouter.post(
  "/changePassword",
  limiter,
  verifyUserToken,
  validateRequest(changePasswordSchema),
  userAuthController.changePassword
);

userAuthRouter.put(
  "/editProfile",
  limiter,
  verifyUserToken,
  validateRequest(editProfileSchema),
  handleMultiPartData.single("image"),
  userAuthController.editProfile
);

userAuthRouter.post(
  "/socialLogin",
  limiter,
  validateRequest(socialLoginSchema),
  userAuthController.socialLogin
);

userAuthRouter.post(
  "/LogOut",
  limiter,
  verifyUserToken,
  userAuthController.LogOut
);

userAuthRouter.delete(
  "/deleteAccount",
  limiter,
  verifyUserToken,
  userAuthController.deleteAccount
);




module.exports = userAuthRouter;