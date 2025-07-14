const prisma = require("../../config/prismaConfig");
const { ConflictError, ValidationError, NotFoundError } = require("../../handler/CustomError");
const { handlerOk } = require("../../handler/resHandler");


const showAllUsers = async (req, res, next) => {
  try {
    const { id } = req.user;
    const findusers = await prisma.user.findMany({
      where: {
        id: {
          not: id,
        }
      }
    });

    if (findusers.length === 0) {
      throw new NotFoundError("no user found");
    }

    handlerOk(res, 200, findusers, 'users found successfully');
  } catch (error) {
    next(error)
  }
}

const countUsers = async (req, res, next) => {
  try {
    const { id } = req.user;

    const countusers = await prisma.user.count({
      where: {
        id: {
          not: id,
        }
      }
    });

    if (countusers.length === 0) {
      throw new NotFoundError("no user found");
    }
    handlerOk(res, 200, countusers, 'users count successfully');
  } catch (error) {
    next(error)
  }
}

const androidUsers = async (req, res, next) => {
  try {
    const findandriodusers = await prisma.user.count({
      where: {
        "deviceType": "ANDROID"
      }
    });

    if (findandriodusers.length === 0) {
      throw new NotFoundError("no android user found");

    }
    handlerOk(res, 200, findandriodusers, 'android users found successfully');

  } catch (error) {
    next(error)
  }
}

const iosUsers = async (req, res, next) => {
  try {
    const findiosusers = await prisma.user.count({
      where: {
        "deviceType": "IOS"
      }
    });

    if (findiosusers.length === 0) {
      throw new NotFoundError("no ios users found");
    }

    handlerOk(res, 200, findiosusers, 'ios users found successfully')
  } catch (error) {
    next(error)
  }
}

const createPrivacyPolicy = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { text } = req.body;
    const findprivacypolicy = await prisma.privacyPolicy.findFirst({
      where: {
        createdById: id,
      }
    });

    if (findprivacypolicy) {
      throw new ConflictError("privacy policy already exists");
    }

    const createprivacy = await prisma.privacyPolicy.create({
      data: {
        text,
        createdById: id
      }
    });

    if (!createprivacy) {
      throw new ValidationError("Failed to create privacy policy");
    }

    handlerOk(res, 200, createprivacy, 'privacy policy created successfully')
  } catch (error) {
    next(error)
  }
}

const showPrivacyPolicy = async (req, res, next) => {
  try {
    const { id } = req.user;

    const findprivacy = await prisma.privacyPolicy.findFirst({
      where: {
        createdById: id
      }
    });

    if (!findprivacy) {
      throw new NotFoundError("Privacy policy not found");
    }

    handlerOk(res, 200, findprivacy, 'Privacy policy found successfully')
  } catch (error) {
    next(error)
  }
}

const updatePrivacyPolicy = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { privacyId } = req.params;
    const { text } = req.body;
    const findprivacy = await prisma.privacyPolicy.findFirst({
      where: {
        createdById: id,
        id: privacyId
      }
    });

    if (!findprivacy) {
      throw new NotFoundError("Privacy policy not found");
    }

    const updateprivacy = await prisma.privacyPolicy.update({
      where: {
        id: findprivacy.id
      },
      data: {
        text
      }
    });

    if (!updateprivacy) {
      throw new ValidationError("Privacy policy not update");
    }

    handlerOk(res, 200, updateprivacy, 'Privacy policy updated successfully')


  } catch (error) {
    next(error)
  }
}

const createTermsCondition = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { text } = req.body;
    const findterms = await prisma.termsCondition.findFirst({
      where: {
        createdById: id
      }
    });

    if (findterms) {
      throw new ConflictError("terms and condition already exist");
    }

    const createterms = await prisma.termsCondition.create({
      data: {
        createdById: id,
        text
      }
    });

    if (!createterms) {
      throw new ValidationError("terms and condition not created");
    }

    handlerOk(res, 201, createterms, "terms and condition created successfully");

  } catch (error) {
    next(error)
  }
}

const showTermsCondition = async (req, res, next) => {
  try {
    const { id } = req.user;
    const findterms = await prisma.termsCondition.findFirst({
      where: {
        createdById: id
      }
    });

    if (!findterms) {
      throw new NotFoundError("terms condtion not found");
    }

    handlerOk(res, 200, findterms, 'terms condtion found successfully')
  } catch (error) {
    next(error)
  }
}

const updateTermsCondition = async (req, res, next) => {
  try {
    const { termsId } = req.params;
    const { id } = req.user;
    const { text } = req.body;

    const findterms = await prisma.termsCondition.findFirst({
      where: {
        id: termsId,
        createdById: id
      }
    });

    if (!findterms) {
      throw new NotFoundError("terms condition not found");
    }

    const updateterms = await prisma.termsCondition.update({
      where: {
        id: findterms.id
      },
      data: {
        text
      }
    });

    if (!updateterms) {
      throw new ValidationError("terms condition not update");
    }

    handlerOk(res, 200, updateterms, "terms condition updated successfully");
  } catch (error) {
    next(error)
  }
}

const createAboutApp = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { text } = req.body;
    const findaboutapp = await prisma.aboutApp.findFirst({
      where: {
        createdById: id
      }
    });

    if (findaboutapp) {
      throw new ConflictError("about app already exist");
    }

    const createaboutapp = await prisma.aboutApp.create({
      data: {
        createdById: id,
        text
      }
    });

    if (!createaboutapp) {
      throw new ValidationError("about app not created");
    }

    handlerOk(res, 201, createaboutapp, "about app created successfully");
  } catch (error) {
    next(error)
  }
}

const showAboutApp = async (req, res, next) => {
  try {
    const { id } = req.user;
    const findaboutapp = await prisma.aboutApp.findFirst({
      where: {
        createdById: id
      }
    });

    if (!findaboutapp) {
      throw new NotFoundError("about app not found");
    }

    handlerOk(res, 200, findaboutapp, 'about app found successfully')

  } catch (error) {
    next(error)
  }
}

const updateAboutApp = async (req, res, next) => {
  try {
    const { aboutappId } = req.params;
    const { id } = req.user;
    const { text } = req.body;

    const findaboutapp = await prisma.aboutApp.findFirst({
      where: {
        id: aboutappId,
        createdById: id
      }
    });

    if (!findaboutapp) {
      throw new NotFoundError("about app not found");
    }

    const updateaboutapp = await prisma.aboutApp.update({
      where: {
        id: findaboutapp.id
      },
      data: {
        text
      }
    });

    if (!updateaboutapp) {
      throw new ValidationError("about app not update");
    }

    handlerOk(res, 200, updateaboutapp, "about app updated successfully");
  } catch (error) {
    next(error)
  }
}

const showUsersFeedBack = async (req, res, next) => {
  try {
    const finduserfeedback = await prisma.feedback.findMany({
    });

    if (finduserfeedback.length === 0) {
      throw new NotFoundError("user feedback not found");
    }

    handlerOk(res, 200, finduserfeedback, 'user feed back found succesfully')
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createPrivacyPolicy,
  showPrivacyPolicy,
  updatePrivacyPolicy,
  createTermsCondition,
  showTermsCondition,
  updateTermsCondition,
  createAboutApp,
  showAboutApp,
  updateAboutApp,
  showAllUsers,
  countUsers,
  androidUsers,
  iosUsers,
  showUsersFeedBack
}