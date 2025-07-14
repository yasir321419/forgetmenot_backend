const Joi = require("joi");

const userFeedbackSchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    email: Joi.string().required(),
    name: Joi.string().required(),
    phone: Joi.string().required(),
    feedback: Joi.string().required(),
  }),
});

module.exports = {
  userFeedbackSchema
}