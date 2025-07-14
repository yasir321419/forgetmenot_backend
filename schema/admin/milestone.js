const Joi = require("joi");

const adminCreateMilestoneCategorySchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
  }),
  body: Joi.object({
    category: Joi.string().required(),
  }),
});

const adminEditMilestoneCategorySchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    categoryId: Joi.string().required(),
  }),
  body: Joi.object({
    category: Joi.string().required(),
  }),
});

const adminDeleteMilestoneCategorySchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    categoryId: Joi.string().required(),

  }),
  body: Joi.object({
  }),
});

const adminCreateOtherMilestoneCategorySchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
  }),
  body: Joi.object({
    othercategory: Joi.string().required(),
  }),
});

const adminEditOtherMilestoneCategorySchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    otherCategoryId: Joi.string().required(),
  }),
  body: Joi.object({
    othercategory: Joi.string().required(),
  }),
});

const adminDeleteOtherMilestoneCategorySchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    otherCategoryId: Joi.string().required(),

  }),
  body: Joi.object({
  }),
});

const adminCreateReminderMilestoneCategorySchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
  }),
  body: Joi.object({
    reminderCategory: Joi.string().required(),
  }),
});

const adminEditReminderMilestoneCategorySchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    reminderCategoryId: Joi.string().required(),
  }),
  body: Joi.object({
    reminderCategory: Joi.string().required(),
  }),
});

const adminDeleteReminderMilestoneCategorySchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    reminderCategoryId: Joi.string().required(),
  }),
  body: Joi.object({
  }),
});

module.exports = {
  adminCreateMilestoneCategorySchema,
  adminEditMilestoneCategorySchema,
  adminDeleteMilestoneCategorySchema,
  adminCreateOtherMilestoneCategorySchema,
  adminEditOtherMilestoneCategorySchema,
  adminDeleteOtherMilestoneCategorySchema,
  adminCreateReminderMilestoneCategorySchema,
  adminEditReminderMilestoneCategorySchema,
  adminDeleteReminderMilestoneCategorySchema

}