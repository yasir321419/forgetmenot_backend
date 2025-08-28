const limiter = require("../../middleware/limiter");
const validateRequest = require("../../middleware/validataRequest");


const userContactRouter = require("express").Router();
const userContactController = require("../../controllers/user/userContactController");
const { verifyUserToken } = require("../../middleware/auth");
const { saveUserContantsSchema, editUserContantsSchema, deleteUserContantsSchema, saveUserContantsInFavoriteSchema } = require("../../schema/user/contact");
const handleMultiPartData = require("../../middleware/multiPartData");
const isFileExists = require("../../middleware/isFileExist");


userContactRouter.post(
  "/saveUserContacts",
  verifyUserToken,
  validateRequest(saveUserContantsSchema),
  handleMultiPartData.any("image"),
  userContactController.saveUserContacts
);

userContactRouter.get(
  "/showUserContacts",
  verifyUserToken,
  userContactController.showUserContacts
);

userContactRouter.put(
  "/editUserContact/:contactId",
  verifyUserToken,
  validateRequest(editUserContantsSchema),
  handleMultiPartData.single("image"),
  userContactController.editUserContact
);

userContactRouter.delete(
  "/deleteUserContact/:contactId",
  verifyUserToken,
  validateRequest(deleteUserContantsSchema),
  userContactController.deleteUserContact
);

userContactRouter.post(
  "/saveFavoriteUserContact/:contactId",
  verifyUserToken,
  validateRequest(saveUserContantsInFavoriteSchema),
  userContactController.saveFavoriteUserContact
);

userContactRouter.get(
  "/showFavoriteUserContacts",
  verifyUserToken,
  userContactController.showFavoriteUserContacts
);

module.exports = userContactRouter;