const limiter = require("../../middleware/limiter");
const validateRequest = require("../../middleware/validataRequest");


const userLibraryRouter = require("express").Router();
const userLibraryController = require("../../controllers/user/userLibraryController");
const { verifyUserToken } = require("../../middleware/auth");
const { userShowMessageAndStickerByCategorySchema } = require("../../schema/user/library");


userLibraryRouter.get(
  "/showAllMessageStickersCategory",
  limiter,
  verifyUserToken,
  userLibraryController.showAllMessageStickersCategory
);

userLibraryRouter.get(
  "/showAllMessageByCategory/:categoryId",
  limiter,
  verifyUserToken,
  validateRequest(userShowMessageAndStickerByCategorySchema),
  userLibraryController.showAllMessageByCategory
);

userLibraryRouter.get(
  "/showAllStickerByCategory/:categoryId",
  limiter,
  verifyUserToken,
  validateRequest(userShowMessageAndStickerByCategorySchema),
  userLibraryController.showAllStickerByCategory
);

module.exports = userLibraryRouter;