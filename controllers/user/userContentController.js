const prisma = require("../../config/prismaConfig");
const { NotFoundError, ValidationError } = require("../../handler/CustomError");
const { handlerOk } = require("../../handler/resHandler");

const showPrivacyPolicy = async (req, res, next) => {
  try {
    const privacyPolicy = await prisma.privacyPolicy.findFirst()
    if (!privacyPolicy) {
      throw new NotFoundError("privay policy not found");
    }

    handlerOk(res, 200, privacyPolicy, 'privacy policy found successfully');
  } catch (error) {
    next(error)
  }
}

const showTermsCondition = async (req, res, next) => {
  try {
    const termscondition = await prisma.termsCondition.findFirst()
    if (!termscondition) {
      throw new NotFoundError("terms and condition not found");
    }

    handlerOk(res, 200, termscondition, 'terms and condition found successfully');
  } catch (error) {
    next(error)
  }
}

const showAboutApp = async (req, res, next) => {
  try {
    const aboutapp = await prisma.aboutApp.findFirst()
    if (!aboutapp) {
      throw new NotFoundError("about app not found");
    }

    handlerOk(res, 200, aboutapp, 'about app found successfully');
  } catch (error) {
    next(error)
  }
}

const submitFeedBack = async (req, res, next) => {
  try {

    const { name, email, phone, feedback } = req.body;

    const feedBack = await prisma.feedback.create({
      data: {
        name,
        email,
        phone,
        message: feedback,
      }
    });

    if (!feedBack) {
      throw new ValidationError("feedback not submit");
    }

    handlerOk(res, 200, feedBack, "feedback submitted successfully");


  } catch (error) {
    next(error)
  }
}

module.exports = {
  showPrivacyPolicy,
  showTermsCondition,
  showAboutApp,
  submitFeedBack
}