const Joi = require("joi");

const userShowMessageAndStickerByCategorySchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    categoryId: Joi.string().required(),
  }),
  body: Joi.object({}),
});

module.exports = {
  userShowMessageAndStickerByCategorySchema
}