const Joi = require("joi");

const saveUserContantsSchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    email: Joi.string().required(),
    name: Joi.string().required(),
    phone: Joi.string().required(),
    relation: Joi.string().required()
  }),
});

const editUserContantsSchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    contactId: Joi.string().required(),
  }),
  body: Joi.object({
    email: Joi.string().required(),
    name: Joi.string().required(),
    phone: Joi.string().required(),
    relation: Joi.string().required()

  }),
});

const deleteUserContantsSchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    contactId: Joi.string().required(),
  }),
  body: Joi.object({
  }),
});

const saveUserContantsInFavoriteSchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    contactId: Joi.string().required(),
  }),
  body: Joi.object({
  }),
});

module.exports = {
  saveUserContantsSchema,
  editUserContantsSchema,
  deleteUserContantsSchema,
  saveUserContantsInFavoriteSchema
}