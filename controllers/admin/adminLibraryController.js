const prisma = require("../../config/prismaConfig");
const { ConflictError, ValidationError, NotFoundError } = require("../../handler/CustomError");
const { handlerOk } = require("../../handler/resHandler");
const fs = require('fs');
const crypto = require('crypto');

const createStickerMessageCategory = async (req, res, next) => {
  try {
    const { category } = req.body;
    const { id } = req.user;

    const findmessagestickercategory = await prisma.messageStickerCategory.findFirst({
      where: {
        name: category
      }
    });

    if (findmessagestickercategory) {
      throw new ConflictError("category already exist");
    }

    const createMessageStickerCategory = await prisma.messageStickerCategory.create({
      data: {
        name: category,
        createdById: id
      }
    });

    if (!createMessageStickerCategory) {
      throw new ValidationError("category not create");
    }

    handlerOk(res, 200, createMessageStickerCategory, 'category created successfully')
  } catch (error) {
    next(error)
  }
}

const showStickerMessageCategories = async (req, res, next) => {
  try {
    const { id } = req.user;

    const findmessagestickercategories = await prisma.messageStickerCategory.findMany({
      where: {
        createdById: id
      }
    });

    if (findmessagestickercategories.length === 0) {
      throw new NotFoundError("category not found");
    }

    handlerOk(res, 200, findmessagestickercategories, 'category found succesfully')
  } catch (error) {
    next(error)
  }
}

const updateStickerMessageCategory = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { categoryId } = req.params;
    const { category } = req.body;
    const findcategory = await prisma.messageStickerCategory.findUnique({
      where: {
        id: categoryId
      }
    });

    if (!findcategory) {
      throw new NotFoundError("category not found");
    }

    const updatecategory = await prisma.messageStickerCategory.update({
      where: {
        id: findcategory.id,
        createdById: id
      },
      data: {
        name: category,
      }
    });

    if (!updatecategory) {
      throw new ValidationError("category not update");
    }

    handlerOk(res, 200, updatecategory, 'category updated successfully')

  } catch (error) {
    next(error)
  }
}

const deleteStickerMessageCategory = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { categoryId } = req.params;

    const deletecategory = await prisma.messageStickerCategory.delete({
      where: {
        id: categoryId,
        createdById: id
      }
    });

    if (!deletecategory) {
      throw new ValidationError("category not delete");
    }

    handlerOk(res, 200, null, 'category deleted successfully')
  } catch (error) {
    next(error)
  }
}

const createMessage = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const { message } = req.body;
    const { id } = req.user;
    const findcategory = await prisma.messageStickerCategory.findUnique({
      where: {
        id: categoryId
      }
    });

    if (!findcategory) {
      throw new NotFoundError("category not found");
    }

    const findmessage = await prisma.message.findFirst({
      where: {
        text: message,
        createdById: id,
        categoryId: categoryId
      }
    });

    if (findmessage) {
      throw new ConflictError("message already exist");
    }

    const createMessage = await prisma.message.create({
      data: {
        text: message,
        categoryId: findcategory.id,
        createdById: id
      }
    });

    if (!createMessage) {
      throw new ValidationError("message not created");
    }

    handlerOk(res, 200, createMessage, 'message created successfully');

  } catch (error) {
    next(error)
  }
}

const showMessages = async (req, res, next) => {
  try {
    const { id } = req.user;

    const findmessages = await prisma.message.findMany({
      where: {
        createdById: id
      },
      include: {
        category: true
      }
    });

    if (findmessages.length === 0) {
      throw new NotFoundError("messages not found");
    }

    handlerOk(res, 200, findmessages, 'messages found successfully')
  } catch (error) {
    next(error)
  }
}

const updateMessage = async (req, res, next) => {
  try {
    const { messageId } = req.params;
    const { message } = req.body;
    const { id } = req.user;
    const findmessage = await prisma.message.findUnique({
      where: {
        id: messageId
      }
    });

    if (!findmessage) {
      throw new NotFoundError("message id not found");
    }

    const updatemessage = await prisma.message.update({
      where: {
        id: findmessage.id,
        createdById: id
      },
      data: {
        text: message
      }
    });

    if (!updatemessage) {
      throw new ValidationError("message not update");
    }

    handlerOk(res, 200, updatemessage, 'message updated successfully')
  } catch (error) {
    next(error)
  }
}

const deleteMessage = async (req, res, next) => {
  try {
    const { messageId } = req.params;
    const { id } = req.user;
    const findmessage = await prisma.message.findUnique({
      where: {
        id: messageId,
        createdById: id
      }
    });

    if (!findmessage) {
      throw new NotFoundError("message id not found");
    }

    const deletemessage = await prisma.message.delete({
      where: {
        id: findmessage.id
      }
    });

    if (!deletemessage) {
      throw new ValidationError("message not deleted");
    }

    handlerOk(res, 200, null, 'message deleted succcessfully')

  } catch (error) {
    next(error)
  }
}

const createSticker = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { categoryId } = req.params;
    const file = req.file;

    if (!file) {
      throw new ValidationError("No file uploaded");
    }

    const filePath = file.filename;
    const fullPath = file.path; // full path to read file content
    const basePath = `http://${req.get("host")}/public/uploads/`;
    const image = `${basePath}${filePath}`;

    // ✅ Read file and generate hash
    const fileBuffer = fs.readFileSync(fullPath);
    const hash = crypto.createHash('sha256').update(fileBuffer).digest('hex');

    // ✅ Find category
    const findcategory = await prisma.messageStickerCategory.findUnique({
      where: {
        id: categoryId
      }
    });

    if (!findcategory) {
      throw new NotFoundError("category not found");
    }

    // ✅ Check by hash, not url
    const findsticker = await prisma.sticker.findFirst({
      where: {
        hash: hash,
        categoryId: findcategory.id,
        createdById: id
      }
    });

    if (findsticker) {
      throw new ConflictError("sticker already exists");
    }

    // ✅ Save the hash with the sticker
    const createSticker = await prisma.sticker.create({
      data: {
        url: image,
        createdById: id,
        categoryId: findcategory.id,
        hash: hash
      }
    });

    if (!createSticker) {
      throw new ValidationError("sticker not created");
    }

    handlerOk(res, 200, createSticker, 'sticker created successfully');

  } catch (error) {
    next(error)
  }
}

const showStickers = async (req, res, next) => {
  try {
    const { id } = req.user;

    const findStickers = await prisma.sticker.findMany({
      where: {
        createdById: id
      },
      include: {
        category: true
      },

    });

    if (findStickers.length === 0) {
      throw new NotFoundError("no stickers found");
    }

    const sanitizedStickers = findStickers.map(({ hash, ...sticker }) => sticker);


    handlerOk(res, 200, sanitizedStickers, 'stickes found successfully');
  } catch (error) {
    next(error)
  }
}

const updateSticker = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { stickerId } = req.params;
    const file = req.file;


    const filePath = file.filename; // use filename instead of path
    const basePath = `http://${req.get("host")}/public/uploads/`;
    const image = `${basePath}${filePath}`;

    const findsticker = await prisma.sticker.findFirst({
      where: {
        id: stickerId,
        createdById: id
      }
    });

    if (!findsticker) {
      throw new NotFoundError("sticker not found");
    }

    const updateSticker = await prisma.sticker.update({
      where: {
        id: findsticker.id,
        createdById: id
      },
      data: {
        url: image
      }
    });

    if (!updateSticker) {
      throw new ValidationError("sticker not update");
    }

    handlerOk(res, 200, updateSticker, 'sticker updated successfully');

  } catch (error) {
    next(error)
  }
}

const deleteSticker = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { stickerId } = req.params;

    const findsticker = await prisma.sticker.findFirst({
      where: {
        id: stickerId,
        createdById: id
      }
    });

    if (!findsticker) {
      throw new NotFoundError("sticker not found");
    }
    const deleteSticker = await prisma.sticker.delete({
      where: {
        id: findsticker.id,
        createdById: id
      }
    });

    if (!deleteSticker) {
      throw new ValidationError("sticker not delete");
    }

    handlerOk(res, 200, null, 'sticker deleted successfully');

  } catch (error) {
    next(error)
  }
}



module.exports = {
  createStickerMessageCategory,
  showStickerMessageCategories,
  updateStickerMessageCategory,
  deleteStickerMessageCategory,
  createSticker,
  showStickers,
  updateSticker,
  deleteSticker,
  createMessage,
  showMessages,
  updateMessage,
  deleteMessage
}