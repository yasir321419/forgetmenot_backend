const Joi = require("joi");

const userCreateMilestoneSchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({

  }),
  body: Joi.object({
    hostName: Joi.string().optional(),
    phoneNumber: Joi.string().optional(),
    message: Joi.string().optional(),
    title: Joi.string().required(),
    date: Joi.date().required(),
    categoryId: Joi.string().required(),
    messageId: Joi.alternatives().try(
      Joi.string(),
      Joi.array().items(Joi.string())
    ).required(),
    stickerId: Joi.alternatives().try(
      Joi.string(),
      Joi.array().items(Joi.string())
    ).required(),
    reminderId: Joi.string().required(),
    otherOptionId: Joi.string().required()

  }),
});

const userEditMilestoneSchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({

    milestoneId: Joi.string().required()
  }),
  body: Joi.object({
    hostName: Joi.string().optional(),
    phoneNumber: Joi.string().optional(),
    message: Joi.string().optional(),
    title: Joi.string().optional(),
    date: Joi.date().optional(),
    categoryId: Joi.string().optional(),
    messageId: Joi.alternatives().try(
      Joi.string(),
      Joi.array().items(Joi.string())
    ).required(),
    stickerId: Joi.alternatives().try(
      Joi.string(),
      Joi.array().items(Joi.string())
    ).required(),
    reminderId: Joi.string().optional(),
    otherOptionId: Joi.string().optional()

  }),
});

const userShowMilestoneSchemaByDayWeekMonthYear = Joi.object({
  query: Joi.object({
    range: Joi.string().optional(),
  }),
  params: Joi.object({
  }),
  body: Joi.object({
  }),
});

const userSendMilestoneToNumberSchema = Joi.object({
  query: Joi.object({
  }),
  params: Joi.object({
    milestoneId: Joi.string().required(),
  }),
  body: Joi.object({
    phoneNumber: Joi.string().required(),
  }),
});

module.exports = {
  userCreateMilestoneSchema,
  userEditMilestoneSchema,
  userShowMilestoneSchemaByDayWeekMonthYear,
  userSendMilestoneToNumberSchema
}