const Joi = require("joi");

const userRegisterSchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    email: Joi.string().required()
  }),
});

const userVerifyOtpSchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({})
  ,
  body: Joi.object({
    email: Joi.string().required(),
    password: Joi.string()
      .min(8)
      .max(30)
      .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d@$!%*?&]{8,}$'))
      .optional()
      .messages({
        'string.pattern.base': 'Password must include uppercase, lowercase, and a number.',
      }),
    confirmPassword: Joi.any()
      .valid(Joi.ref('password'))
      .optional()
      .messages({ 'any.only': 'Confirm password must match password' }),
    otp: Joi.string().required(),
  }),
});

const userCreatedProfileSchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    country: Joi.string().required(),
    deviceToken: Joi.string().required(),
    deviceType: Joi.string().required(),
  }),
});

const userResendOtpSchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    email: Joi.string().required()
  }),
});

const userForgetPasswordSchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    email: Joi.string().required()
  }),
});

const userLoginSchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    email: Joi.string().required(),
    password: Joi.string()
      .min(8)
      .max(30)
      .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d@$!%*?&]{8,}$'))
      .required()
      .messages({
        'string.pattern.base': 'Password must include uppercase, lowercase, and a number.',
      }),
  }),
});

const resetPasswordSchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    password: Joi.string()
      .min(8)
      .max(30)
      .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d@$!%*?&]{8,}$'))
      .required()
      .messages({
        'string.pattern.base': 'Password must include uppercase, lowercase, and a number.',
      }),
    confirmPassword: Joi.any()
      .valid(Joi.ref('password'))
      .optional()
      .messages({ 'any.only': 'Confirm password must match password' }),
  }),
});

const changePasswordSchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    currentpassword: Joi.string()
      .min(8)
      .max(30)
      .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d@$!%*?&]{8,}$'))
      .required()
      .messages({
        'string.pattern.base': 'Password must include uppercase, lowercase, and a number.',
      }),
    newpassword: Joi.string()
      .min(8)
      .max(30)
      .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d@$!%*?&]{8,}$'))
      .required()
      .messages({
        'string.pattern.base': 'Password must include uppercase, lowercase, and a number.',
      }),
    confirmPassword: Joi.any()
      .valid(Joi.ref('newpassword'))
      .optional()
      .messages({ 'any.only': 'Confirm password must match password' }),
  }),
});


const editProfileSchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    // email: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    country: Joi.string().required(),
  }),
});

const socialLoginSchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    email: Joi.string().email().required(),
    accessToken: Joi.string().required(),
    socialType: Joi.string()
      .valid('GOOGLE', 'APPLE')
      .required()
      .messages({
        'any.only': 'socialType must be either GOOGLE or APPLE',
      }),
    deviceType: Joi.string()
      .valid('ANDROID', 'IOS')
      .optional()
      .messages({
        'any.only': 'deviceType must be either ANDROID or IOS',
      }),
    deviceToken: Joi.string().optional(),
  }),
});

module.exports = {
  userRegisterSchema,
  userVerifyOtpSchema,
  userForgetPasswordSchema,
  userResendOtpSchema,
  userLoginSchema,
  resetPasswordSchema,
  changePasswordSchema,
  editProfileSchema,
  socialLoginSchema,
  userCreatedProfileSchema
}