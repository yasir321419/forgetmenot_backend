const limiter = require("../../middleware/limiter");
const validateRequest = require("../../middleware/validataRequest");


const adminLibraryRouter = require("express").Router();
const adminLibraryController = require("../../controllers/admin/adminLibraryController");
const { verifyAdminToken } = require("../../middleware/auth");
const { adminCreateStickerMessageCategorySchema, adminUpdateStickerMessageCategorySchema, adminDeleteStickerMessageCategorySchema, adminCreateMessageSchema, adminUpdateMessageSchema, adminDeteteMessageSchema, adminUpdateOrDeleteStickerSchema, adminCreateUpdateOrDeleteStickerSchema, adminCreateStickerSchema, adminUpdateStickerSchema } = require("../../schema/admin/library");
const handleMultiPartData = require("../../middleware/multiPartData");
const isFileExists = require("../../middleware/isFileExist");

// adminLibraryRouter.post(
//   "/createStickerMessageCategory",
//   limiter,
//   verifyAdminToken,
//   validateRequest(adminCreateStickerMessageCategorySchema),
//   adminLibraryController.createStickerMessageCategory
// );

// adminLibraryRouter.get(
//   "/showStickerMessageCategories",
//   limiter,
//   verifyAdminToken,
//   adminLibraryController.showStickerMessageCategories
// );

// adminLibraryRouter.put(
//   "/updateStickerMessageCategory/:categoryId",
//   limiter,
//   verifyAdminToken,
//   validateRequest(adminUpdateStickerMessageCategorySchema),
//   adminLibraryController.updateStickerMessageCategory
// );

// adminLibraryRouter.delete(
//   "/deleteStickerMessageCategory/:categoryId",
//   limiter,
//   verifyAdminToken,
//   validateRequest(adminDeleteStickerMessageCategorySchema),
//   adminLibraryController.deleteStickerMessageCategory
// );

// adminLibraryRouter.post(
//   "/createMessage/:categoryId",
//   limiter,
//   verifyAdminToken,
//   validateRequest(adminCreateMessageSchema),
//   adminLibraryController.createMessage
// );

// adminLibraryRouter.get(
//   "/showMessages",
//   limiter,
//   verifyAdminToken,
//   adminLibraryController.showMessages
// );

// adminLibraryRouter.put(
//   "/updateMessage/:messageId",
//   limiter,
//   verifyAdminToken,
//   validateRequest(adminUpdateMessageSchema),
//   adminLibraryController.updateMessage
// );

// adminLibraryRouter.delete(
//   "/deleteMessage/:messageId",
//   limiter,
//   verifyAdminToken,
//   validateRequest(adminDeteteMessageSchema),
//   adminLibraryController.deleteMessage
// );

// adminLibraryRouter.post(
//   "/createSticker/:categoryId",
//   limiter,
//   verifyAdminToken,
//   validateRequest(adminCreateStickerSchema),
//   handleMultiPartData.single("image"),
//   isFileExists("sticker image required"),
//   adminLibraryController.createSticker
// );

// adminLibraryRouter.get(
//   "/showStickers",
//   limiter,
//   verifyAdminToken,
//   adminLibraryController.showStickers
// );

// adminLibraryRouter.put(
//   "/updateSticker/:stickerId",
//   limiter,
//   verifyAdminToken,
//   validateRequest(adminUpdateStickerSchema),
//   handleMultiPartData.single("image"),
//   isFileExists("sticker image required"),
//   adminLibraryController.updateSticker
// );

// adminLibraryRouter.delete(
//   "/deleteSticker/:stickerId",
//   limiter,
//   verifyAdminToken,
//   validateRequest(adminUpdateStickerSchema),
//   adminLibraryController.deleteSticker
// );

module.exports = adminLibraryRouter;