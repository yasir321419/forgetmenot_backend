const limiter = require("../../middleware/limiter");
const validateRequest = require("../../middleware/validataRequest");


const userLibraryRouter = require("express").Router();
const userLibraryController = require("../../controllers/user/userLibraryController");
const { verifyUserToken } = require("../../middleware/auth");
const { userShowMessageAndStickerByCategorySchema } = require("../../schema/user/library");


userLibraryRouter.get(
  "/showAllMessageStickersCategory",
  verifyUserToken,
  userLibraryController.showAllMessageStickersCategory
);

userLibraryRouter.get(
  "/showAllMessageByCategory/:categoryId",
  verifyUserToken,
  validateRequest(userShowMessageAndStickerByCategorySchema),
  userLibraryController.showAllMessageByCategory
);

userLibraryRouter.get(
  "/showAllStickerByCategory/:categoryId",
  verifyUserToken,
  validateRequest(userShowMessageAndStickerByCategorySchema),
  userLibraryController.showAllStickerByCategory
);

module.exports = userLibraryRouter;