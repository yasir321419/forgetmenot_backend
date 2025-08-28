const limiter = require("../../middleware/limiter");
const validateRequest = require("../../middleware/validataRequest");


const userAuthRouter = require("express").Router();
const userAuthController = require("../../controllers/user/userAuthController");
const { userRegisterSchema, userVerifyOtpSchema, userForgetPasswordSchema, userLoginSchema, userResendOtpSchema, resetPasswordSchema, changePasswordSchema, editProfileSchema, socialLoginSchema, userCreatedProfileSchema } = require("../../schema/user/auth");
const { verifyUserToken } = require("../../middleware/auth");
const handleMultiPartData = require("../../middleware/multiPartData");

userAuthRouter.post(
  "/SignUp",
  validateRequest(userRegisterSchema),
  userAuthController.SignUp
);

userAuthRouter.post(
  "/VerifyOtp",
  validateRequest(userVerifyOtpSchema),
  userAuthController.VerifyOtp
);

userAuthRouter.post(
  "/forgetPassword",
  validateRequest(userForgetPasswordSchema),
  userAuthController.forgetPassword
);

userAuthRouter.post(
  "/resendOtp",
  validateRequest(userResendOtpSchema),
  userAuthController.resendOtp
);

userAuthRouter.post(
  "/createdProfile",
  verifyUserToken,
  validateRequest(userCreatedProfileSchema),
  userAuthController.createdProfile
);

userAuthRouter.post(
  "/Login",
  validateRequest(userLoginSchema),
  userAuthController.Login
);

userAuthRouter.post(
  "/resetPassword",
  verifyUserToken,
  validateRequest(resetPasswordSchema),
  userAuthController.resetPassword
);

userAuthRouter.post(
  "/changePassword",
  verifyUserToken,
  validateRequest(changePasswordSchema),
  userAuthController.changePassword
);

userAuthRouter.put(
  "/editProfile",
  verifyUserToken,
  validateRequest(editProfileSchema),
  handleMultiPartData.single("image"),
  userAuthController.editProfile
);

userAuthRouter.post(
  "/socialLogin",
  validateRequest(socialLoginSchema),
  userAuthController.socialLogin
);

userAuthRouter.post(
  "/LogOut",
  verifyUserToken,
  userAuthController.LogOut
);

userAuthRouter.delete(
  "/deleteAccount",
  verifyUserToken,
  userAuthController.deleteAccount
);

userAuthRouter.get(
  "/getMe",
  verifyUserToken,
  userAuthController.getMe
);




module.exports = userAuthRouter;