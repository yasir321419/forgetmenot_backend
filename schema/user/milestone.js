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
    ).optional(),
    stickerId:
      Joi.string().optional(),

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
    categoryId: Joi.string().allow(null, '').optional(),
    messageId: Joi.string().allow(null, '').optional(),
    stickerId: Joi.string().allow(null, '').optional(), // Allow null or empty string for stickerId
    reminderId: Joi.string().allow(null, '').optional(),
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