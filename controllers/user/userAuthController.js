const prisma = require("../../config/prismaConfig");
const { ConflictError, NotFoundError, BadRequestError, ValidationError } = require("../../handler/CustomError");
const { generateOtp } = require("../../utils/generateOtp");
const generateOtpExpiry = require("../../utils/verifyOtp");
const { otpConstants, socailConstants, deviceConstants, userConstants } = require("../../constant/constant")
const emailTemplates = require("../../utils/emailTemplate");
const sendEmails = require("../../utils/sendEmail");
const { handlerOk } = require("../../handler/resHandler");
const { hashPassword, comparePassword } = require("../../utils/passwordHashed");
const { genToken } = require("../../utils/generateToken");
const admin = require('firebase-admin');

const SignUp = async (req, res, next) => {
  try {
    const { email } = req.body;

    const finduser = await prisma.user.findFirst({
      where: {
        email
      }
    });

    if (finduser) {
      throw new ConflictError("user already exist")
    }

    const otp = generateOtp();
    const expiretime = generateOtpExpiry(1);

    const saveotp = await prisma.otp.create({
      data: {
        otp: otp,
        // userId: null,
        otpReason: otpConstants.REGISTER,
        otpUsed: false,
        expiresAt: expiretime,
        email
      }
    });

    const emailData = {
      subject: "ForgetMeNot - Account Verification",
      html: emailTemplates.register(otp),
    };

    await sendEmails(email, emailData.subject, emailData.html);


    handlerOk(res, 201, otp, "otp send successfully")

  } catch (error) {
    next(error)
  }
}

const VerifyOtp = async (req, res, next) => {
  try {
    const {
      email,
      // phoneNumber,
      // firstName,
      // lastName,
      password,
      otp
      // country,
      // deviceToken,
      // deviceType
    } = req.body;

    // ✅ Find OTP
    const findotp = await prisma.otp.findFirst({
      where: {
        otp,
      },
    });

    if (!findotp) {
      throw new NotFoundError("OTP not found");
    }

    // ✅ Check if OTP is expired
    const now = new Date();
    if (findotp.expiresAt < now) {
      throw new ConflictError("OTP has expired");
    }

    if (findotp.otpReason === "REGISTER") {
      const hashedPassword = await hashPassword(password);

      if (findotp.otpUsed) {
        throw new ConflictError("OTP already used");
      }

      // ✅ Create the user
      const saveuser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          // phoneNumber,
          // firstName,
          // lastName,
          // country,
          // deviceToken,
          // deviceType,
          userType: userConstants.USER
        }
      });

      // ✅ Mark OTP as used
      await prisma.otp.update({
        where: {
          id: findotp.id,
        },
        data: {
          otpUsed: true,
          // userId: saveuser.id,
        },
      });

      // // ✅ Assign Free subscription plan
      // let freePlan = await prisma.subscriptionPlan.findUnique({
      //   where: { name: 'Free' }
      // });

      // // Auto-create Free plan if not exists
      // if (!freePlan) {
      //   freePlan = await prisma.subscriptionPlan.create({
      //     data: {
      //       name: 'Free',
      //       price: 0.0,
      //       duration: 7 // day
      //     }
      //   });
      // }

      // const now = new Date();
      // const expiry = new Date();
      // expiry.setDate(expiry.getDate() + 7); // Set expiry to 7 days later


      // await prisma.userSubscription.create({
      //   data: {
      //     userId: saveuser.id,
      //     subscriptionPlanId: freePlan.id,
      //     startDate: now,
      //     endDate: expiry,
      //     isActive: true
      //   }
      // });

      // Generate token
      const token = genToken({
        id: saveuser.id,
        userType: userConstants.USER,
      });

      return handlerOk(res, 201, { ...saveuser, userToken: token }, "User registered successfully");
    }

    if (findotp.otpReason === "FORGETPASSWORD") {
      const finduser = await prisma.user.findUnique({
        where: {
          email
        }
      });

      if (!finduser) {
        throw new NotFoundError("Email not found");
      }

      if (findotp.otpUsed) {
        throw new ConflictError("OTP already used");
      }

      // ✅ Mark OTP as used
      await prisma.otp.update({
        where: {
          id: findotp.id,
        },
        data: {
          otpUsed: true,
          // userId: finduser.id,
        },
      });

      // ✅ Generate token
      const token = genToken({
        id: finduser.id,
        userType: userConstants.USER,
      });

      return handlerOk(res, 201, { userToken: token }, "Now set your password");
    }

  } catch (error) {
    next(error);
  }
}

const forgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const finduser = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (!finduser) {
      throw new NotFoundError("email not found");
    }

    const otp = generateOtp();
    const expiretime = generateOtpExpiry(1);


    const saveotp = await prisma.otp.create({
      data: {
        otp: otp,
        // userId: finduser.id,
        otpReason: otpConstants.FORGETPASSWORD,
        otpUsed: false,
        expiresAt: expiretime,
        email
      }
    });


    const emailData = {
      subject: "ForgetMeNot - Reset Your Password",
      html: emailTemplates.forgetPassword(otp),
    };

    await sendEmails(email, emailData.subject, emailData.html);


    handlerOk(res, 200, otp, 'otp send successfully')

  } catch (error) {
    next(error)
  }
}

const resetPassword = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { password } = req.body;

    const hashedPassword = await hashPassword(password);

    const updatePassword = await prisma.user.update({
      where: {
        id: id
      },
      data: {
        password: hashedPassword
      }
    });

    if (!updatePassword) {
      throw new ValidationError("password not update")
    }

    handlerOk(res, 200, null, 'password updated successfully')

  } catch (error) {
    next(error)
  }
}

const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const finduser = await prisma.user.findUnique({
      where: {
        email
      },
    });

    if (!finduser) {
      throw new NotFoundError("user not found")
    }

    const comparePass = await comparePassword(password, finduser.password);

    if (!comparePass) {
      throw new BadRequestError("password not correct");
    }

    const token = genToken({
      id: finduser.id,
      userType: userConstants.USER
    });

    const response = {
      userToken: token
    }

    handlerOk(res, 200, { ...finduser, ...response }, 'user login successfully')

  } catch (error) {
    next(error)
  }
}

const resendOtp = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Find existing OTP record by email (not user)
    const existingOtp = await prisma.otp.findFirst({
      where: {
        email,
        otpUsed: false,
      },
    });

    if (!existingOtp) {
      throw new NotFoundError("OTP Record Not Found");
    }

    const otp = generateOtp();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    await prisma.otp.update({
      where: { id: existingOtp.id },
      data: {
        otp,
        otpUsed: false,
        expiresAt,
      },
    });

    const emailData = {
      subject: "ForgetMeNot - Account Verification",
      html: emailTemplates.resendOTP(otp),
    };

    await sendEmails(email, emailData.subject, emailData.html);

    handlerOk(res, 201, otp, "OTP sent successfully. Now verify your OTP.");
  } catch (error) {
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const { id, password } = req.user;
    const { currentpassword, newpassword } = req.body;

    const comparePass = await comparePassword(currentpassword, password);

    if (!comparePass) {
      throw new BadRequestError("password not correct");
    }

    const hashedPassword = await hashPassword(newpassword, 10);

    const updatepass = await prisma.user.update({
      where: {
        id: id
      },
      data: {
        password: hashedPassword
      }
    });

    if (!updatepass) {
      throw new ValidationError("Password Not Change");
    }

    handlerOk(res, 200, updatepass, 'Password Changed Successfully');
  } catch (error) {
    next(error)
  }
}

const editProfile = async (req, res, next) => {
  try {
    const { firstName, lastName, phoneNumber, country } = req.body;

    const { id } = req.user;
    const file = req.file;

    console.log(file, 'file');


    const currentPrifile = await prisma.user.findUnique({
      where: {
        id: id
      }
    });

    if (!currentPrifile) {
      throw new NotFoundError("user not found")
    }

    const updateObj = {}

    if (firstName) {
      updateObj.firstName = firstName
    }

    if (lastName) {
      updateObj.lastName = lastName
    }

    if (phoneNumber) {
      updateObj.phoneNumber = phoneNumber
    }


    if (country) {
      updateObj.country = country
    }


    if (file) {
      const filePath = file.filename; // use filename instead of path
      const basePath = `http://${req.get("host")}/public/uploads/`;
      const image = `${basePath}${filePath}`;
      updateObj.image = image;
    }

    const updateuser = await prisma.user.update({
      where: {
        id: id
      },
      data: updateObj
    });

    if (!updateuser) {
      throw new ValidationError("user not update")
    }

    handlerOk(res, 200, updateuser, 'user updated successfully')



  } catch (error) {
    next(error)
  }
}

const LogOut = async (req, res, next) => {
  try {
    const { id } = req.user;

    console.log(id, 'id');

    const userlogout = await prisma.user.update({
      where: {
        id: id
      },
      data: {
        deviceToken: null
      }
    });

    if (!userlogout) {
      throw new ValidationError("user not logout")
    }

    handlerOk(res, 200, null, 'user logout successfully')
  } catch (error) {
    next(error)
  }
}

const deleteAccount = async (req, res, next) => {
  try {
    const { id } = req.user;
    console.log(id, 'id');

    await prisma.notification.deleteMany({ where: { userId: id } });
    await prisma.userSubscription.deleteMany({ where: { userId: id } });
    await prisma.favoriteContact.deleteMany({ where: { createdById: id } });
    await prisma.contacts.deleteMany({ where: { createdById: id } });
    await prisma.otp.deleteMany({ where: { userId: id } });
    await prisma.milestone.deleteMany({ where: { createdById: id } });

    await prisma.user.delete({ where: { id } });


    // const deleteuser = await prisma.user.delete({
    //   where: {
    //     id: id
    //   }
    // });

    // if (!deleteuser) {
    //   throw new ValidationError("user not delete")
    // }

    handlerOk(res, 200, null, 'user deleted successfully')
  } catch (error) {
    next(error)
  }
}

const socialLogin = async (req, res, next) => {
  try {
    const { accessToken, socialType, deviceType, deviceToken } = req.body;


    // Verify token with Firebase Admin
    const decodedToken = await admin.auth().verifyIdToken(accessToken);

    const { uid, email, name, picture } = decodedToken;

    if (!email) {
      throw new BadRequestError("Email is required");
    }

    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { email },
    });

    // If user doesn't exist, register them
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          firstName: name?.split(" ")[0] || null,
          lastName: name?.split(" ")[1] || null,
          accessToken: uid,
          socialType: socialType,
          image: picture || null,
          deviceType,
          deviceToken,
        },
      });
    } else {
      // Optional: Update device info on login
      await prisma.user.update({
        where: { email },
        data: {
          deviceType,
          deviceToken,
        },
      });
    }

    // Generate your own app token (e.g., JWT)

    const token = genToken({
      id: user.id,
      userType: userConstants.USER
    });

    handlerOk(res, 200, { user, token }, "Login successful");
  } catch (error) {
    next(error);
  }
};

const createdProfile = async (req, res, next) => {
  try {
    const { email } = req.user;
    const {
      phoneNumber,
      firstName,
      lastName,
      country,
      deviceToken,
      deviceType
    } = req.body;

    // ✅ Create the user
    const saveuser = await prisma.user.update({
      where: {
        email
      },
      data: {
        // email,
        // password: hashedPassword,
        phoneNumber,
        firstName,
        lastName,
        country,
        deviceToken,
        deviceType,
        userType: userConstants.USER,
        isCreatedProfile: true
      }
    });

    // ✅ Mark OTP as used
    const otpRecord = await prisma.otp.findFirst({
      where: {
        email: email
      }
    });

    if (!otpRecord) {
      throw new NotFoundError("OTP not found");
    }

    await prisma.otp.update({
      where: {
        id: otpRecord.id,  // Use the id of the found OTP record
      },
      data: {
        otpUsed: true,
      },
    });

    // ✅ Assign Free subscription plan
    let freePlan = await prisma.subscriptionPlan.findUnique({
      where: { name: 'Free' }
    });

    // Auto-create Free plan if not exists
    if (!freePlan) {
      freePlan = await prisma.subscriptionPlan.create({
        data: {
          name: 'Free',
          price: 0.0,
          duration: 7 // day
        }
      });
    }

    const now = new Date();
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7); // Set expiry to 7 days later


    await prisma.userSubscription.create({
      data: {
        userId: saveuser.id,
        subscriptionPlanId: freePlan.id,
        startDate: now,
        endDate: expiry,
        isActive: true
      }
    });

    // Generate token
    const token = genToken({
      id: saveuser.id,
      userType: userConstants.USER,
    });

    return handlerOk(res, 201, { ...saveuser, userToken: token }, "User Profile Created Successfully");

  } catch (error) {
    next(error)
  }
}



module.exports = {
  SignUp,
  VerifyOtp,
  Login,
  changePassword,
  editProfile,
  LogOut,
  deleteAccount,
  socialLogin,
  forgetPassword,
  resetPassword,
  resendOtp,
  createdProfile

}