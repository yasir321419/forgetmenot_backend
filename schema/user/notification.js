const Joi = require("joi");

const userReadNotificationSchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    notificationId: Joi.string().required(),
  }),
  body: Joi.object({


    isRead: Joi.boolean().required()

  }),
});

module.exports = {
  userReadNotificationSchema
}