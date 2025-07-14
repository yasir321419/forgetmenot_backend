const prisma = require("../../config/prismaConfig");
const { NotFoundError } = require("../../handler/CustomError");
const { handlerOk } = require("../../handler/resHandler");

const showAllMessageStickersCategory = async (req, res, next) => {
  try {
    const findstickermessagecategory = await prisma.messageStickerCategory.findMany();

    if (findstickermessagecategory.length === 0) {
      throw new NotFoundError("Message Sticker Category not found");
    }

    handlerOk(res, 200, findstickermessagecategory, "Message Sticker found successfully")

  } catch (error) {
    next(error)
  }
}

const showAllMessageByCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const findmessagesbycategory = await prisma.message.findMany({
      where: {
        categoryId: categoryId
      }
    });

    if (findmessagesbycategory.length === 0) {
      throw new NotFoundError("Messages not found");
    }

    handlerOk(res, 200, findmessagesbycategory, "Messages found successfully");


  } catch (error) {
    next(error)
  }
}

const showAllStickerByCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    const findstickersbycategory = await prisma.sticker.findMany({
      where: {
        categoryId: categoryId
      }
    });

    if (findstickersbycategory.length === 0) {
      throw new NotFoundError("Stickers not found");
    }

    handlerOk(res, 200, findstickersbycategory, "Stickers found successfully");
  } catch (error) {
    next(error)
  }
}

module.exports = {
  showAllMessageStickersCategory,
  showAllMessageByCategory,
  showAllStickerByCategory
}