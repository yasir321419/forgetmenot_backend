const Joi = require("joi");

const adminCreateStickerMessageCategorySchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
  }),
  body: Joi.object({
    category: Joi.string().valid("ALL", "FUNERAL", "FUNDRAISER", "DEATHANNIVERSARY", "RETIREMENT", "BIRTHDAY", "WEDDING", "HOLIDAY").required(),
  }),
});

const adminUpdateStickerMessageCategorySchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    categoryId: Joi.string().required()
  }),
  body: Joi.object({
    category: Joi.string().required(),
  }),
});

const adminDeleteStickerMessageCategorySchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    categoryId: Joi.string().required()
  }),
  body: Joi.object({
  }),
});

const adminCreateMessageSchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    categoryId: Joi.string().required()
  }),
  body: Joi.object({
    message: Joi.string().required(),
  }),
});


const adminUpdateMessageSchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    messageId: Joi.string().required()
  }),
  body: Joi.object({
    message: Joi.string().required(),
  }),
});

const adminDeteteMessageSchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    messageId: Joi.string().required()
  }),
  body: Joi.object({
  }),
});





const adminCreateStickerSchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    categoryId: Joi.string().required()
  }),
  body: Joi.object({
  }),
});

const adminUpdateStickerSchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    stickerId: Joi.string().required()
  }),
  body: Joi.object({
  }),
});



module.exports = {
  adminCreateStickerMessageCategorySchema,
  adminUpdateStickerMessageCategorySchema,
  adminDeleteStickerMessageCategorySchema,
  adminCreateMessageSchema,
  adminUpdateMessageSchema,
  adminDeteteMessageSchema,
  adminCreateStickerSchema,
  adminUpdateStickerSchema
}