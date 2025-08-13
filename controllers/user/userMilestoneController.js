const prisma = require("../../config/prismaConfig");
const { NotFoundError, ValidationError, ConflictError } = require("../../handler/CustomError");
const { handlerOk } = require("../../handler/resHandler");
const checkUserSubscription = require("../../utils/checkSubscription");
const send_message = require("../../utils/sendSms");
const { validateFreePlanUsage } = require("../../utils/subscriptionValidator");

const showMileStoneCategory = async (req, res, next) => {
  try {
    const findmilestonecategory = await prisma.mileStoneCategory.findMany();

    if (findmilestonecategory.length === 0) {
      throw new NotFoundError("milestone category not found")
    }

    handlerOk(res, 200, findmilestonecategory, "milestone category found successfully")
  } catch (error) {
    next(error)
  }
}

const showOtherMilestoneCategory = async (req, res, next) => {
  try {
    const findothermilestonecategory = await prisma.otherOptionRemiderCategory.findMany();

    if (findothermilestonecategory.length === 0) {
      throw new NotFoundError("other milestone category not found")
    }

    handlerOk(res, 200, findothermilestonecategory, "other milestone category found successfully")
  } catch (error) {
    next(error)
  }
}

const showReminderCategory = async (req, res, next) => {
  try {
    const findremindermilestonecategory = await prisma.remiderCategory.findMany();

    if (findremindermilestonecategory.length === 0) {
      throw new NotFoundError("reminder milestone category not found")
    }

    handlerOk(res, 200, findremindermilestonecategory, "reminder milestone category found successfully")
  } catch (error) {
    next(error)
  }
}

// const createMilestone = async (req, res, next) => {
//   try {
//     const { hostName, phoneNumber, message, title, date, categoryId, messageId, stickerId, reminderId, otherOptionId } = req.body;
//     const { id } = req.user;


//     // await checkUserSubscription(id, "your package has expired Upgrade your plan to create the milestone");

//     // 🔍 Validate usage limits based on plan
//     // await validateFreePlanUsage(id, messageIds, stickerIds); // ✅ Use your validator here



//     const findcategory = await prisma.mileStoneCategory.findUnique({
//       where: {
//         id: categoryId,
//       }
//     });

//     if (!findcategory) {
//       throw new NotFoundError("milestone category not found")
//     }

//     const findothercategory = await prisma.otherOptionRemiderCategory.findUnique({
//       where: {
//         id: otherOptionId,
//       }
//     })

//     if (!findothercategory) {
//       throw new NotFoundError("other milestone category not found")
//     }

//     const findremindercategory = await prisma.remiderCategory.findUnique({
//       where: {
//         id: reminderId,
//       }
//     });

//     if (!findremindercategory) {
//       throw new NotFoundError("reminder milestone category not found")
//     }

//     const findmessage = await prisma.message.findMany({
//       where: {
//         id: messageId
//         // {
//         //   in: messageId
//         // },
//       }
//     });

//     if (!findmessage) {
//       throw new NotFoundError("message not found")
//     }

//     const findsticker = await prisma.sticker.findMany({
//       where: {
//         id: stickerId
//         // {
//         //   in: stickerId
//         // },
//       }
//     });

//     if (!findsticker) {
//       throw new NotFoundError("sticker not found")
//     }

//     const parsedDate = new Date(date);


//     const existingmilestone = await prisma.milestone.findFirst({
//       where: {
//         createdById: id,
//         date: parsedDate,
//       }
//     });

//     if (existingmilestone) {
//       throw new ConflictError("milestone already exists")
//     }

//     const createmilestone = await prisma.milestone.create({
//       data: {
//         title,
//         categoryId: findcategory.id,
//         reminderId: findremindercategory.id,
//         stickerId: findsticker.id,
//         messageId: findmessage.id,
//         date: parsedDate,
//         hostname: hostName,
//         Phonenumber: phoneNumber,
//         hostmessage: message,
//         createdById: id
//       },
//       include: {
//         category: true,
//         reminder: true,
//         sticker: true,
//         message: true
//       }
//     });

//     if (!createmilestone) {
//       throw new ValidationError("milestone not create")
//     }

//     handlerOk(res, 200, createmilestone, "milestone created successfully")

//   } catch (error) {
//     next(error)
//   }
// }


const createMilestone = async (req, res, next) => {
  try {
    const { hostName, phoneNumber, message, title, date, categoryId, messageId, stickerId, reminderId, otherOptionId } = req.body;
    const { id } = req.user;

    // Validate milestone category
    const findcategory = await prisma.mileStoneCategory.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!findcategory) {
      throw new NotFoundError("milestone category not found");
    }

    // Validate other milestone category
    const findothercategory = await prisma.otherOptionRemiderCategory.findUnique({
      where: {
        id: otherOptionId,
      },
    });

    if (!findothercategory) {
      throw new NotFoundError("other milestone category not found");
    }

    // Validate reminder category
    const findremindercategory = await prisma.remiderCategory.findUnique({
      where: {
        id: reminderId,
      },
    });

    if (!findremindercategory) {
      throw new NotFoundError("reminder milestone category not found");
    }

    // Validate message
    let findmessage = null;
    if (messageId) {
      findmessage = await prisma.message.findUnique({
        where: {
          id: messageId,
        },
      });

      if (!findmessage) {
        throw new NotFoundError("message not found");
      }
    }

    // Validate sticker
    let findsticker = null;
    if (stickerId) {
      findsticker = await prisma.sticker.findUnique({
        where: {
          id: stickerId,
        },
      });

      if (!findsticker) {
        throw new NotFoundError("sticker not found");
      }
    }

    // Check if the milestone already exists for the creator and date
    const parsedDate = new Date(date);
    const existingmilestone = await prisma.milestone.findFirst({
      where: {
        createdById: id,
        date: parsedDate,
      },
    });

    if (existingmilestone) {
      throw new ConflictError("milestone already exists");
    }

    // Create milestone
    const createmilestone = await prisma.milestone.create({
      data: {
        title,
        categoryId: findcategory.id,
        reminderId: findremindercategory.id,
        stickerId: findsticker ? findsticker.id : null, // Set stickerId if it exists
        messageId: findmessage ? findmessage.id : null, // Set messageId if it exists
        date: parsedDate,
        hostname: hostName,
        Phonenumber: phoneNumber,
        hostmessage: message,
        createdById: id,
      },
      include: {
        category: true,
        reminder: true,
        sticker: true,
        message: true,
      },
    });

    if (!createmilestone) {
      throw new ValidationError("milestone not created");
    }

    handlerOk(res, 200, createmilestone, "milestone created successfully");
  } catch (error) {
    next(error);
  }
};


const showAllMilestone = async (req, res, next) => {
  try {
    const { id } = req.user;

    const findallmileston = await prisma.milestone.findMany({
      where: {
        createdById: id
      },
      include: {
        category: true,
        reminder: true,
        sticker: true,
        message: true
      }
    });

    if (findallmileston.length === 0) {
      throw new ConflictError("milestone not found")
    }

    handlerOk(res, 200, findallmileston, "milestone found successfully")
  } catch (error) {
    next(error)
  }
}

// const editMilestone = async (req, res, next) => {
//   try {
//     const { milestoneId } = req.params;
//     const { hostName, phoneNumber, message, title, date, categoryId, messageId, stickerId, reminderId, otherOptionId } = req.body;

//     const findmilestone = await prisma.milestone.findUnique({
//       where: {
//         id: milestoneId
//       }
//     });

//     if (!findmilestone) {
//       throw new ValidationError("milestone id not found")
//     }

//     const findcategory = await prisma.mileStoneCategory.findUnique({
//       where: {
//         id: categoryId,
//       }
//     });

//     if (!findcategory) {
//       throw new NotFoundError("milestone category not found")
//     }

//     const findothercategory = await prisma.otherOptionRemiderCategory.findUnique({
//       where: {
//         id: otherOptionId,
//       }
//     })

//     if (!findothercategory) {
//       throw new NotFoundError("other milestone category not found")
//     }

//     const findremindercategory = await prisma.remiderCategory.findUnique({
//       where: {
//         id: reminderId,
//       }
//     });

//     if (!findremindercategory) {
//       throw new NotFoundError("reminder milestone category not found")
//     }

//     const findmessage = await prisma.message.findUnique({
//       where: {
//         id: messageId,
//       }
//     });

//     if (!findmessage) {
//       throw new NotFoundError("message not found")
//     }

//     const findsticker = await prisma.sticker.findUnique({
//       where: {
//         id: stickerId,
//       }
//     });

//     if (!findsticker) {
//       throw new NotFoundError("sticker not found")
//     }

//     const parsedDate = new Date(date);

//     const updateObj = {};

//     if (hostName) {
//       updateObj.hostname = hostName;
//     }

//     if (phoneNumber) {
//       updateObj.Phonenumber = phoneNumber;
//     }

//     if (message) {
//       updateObj.hostmessage = message;
//     }

//     if (title) {
//       updateObj.title = title;
//     }

//     if (date) {
//       updateObj.date = parsedDate;
//     }

//     const updatemilestone = await prisma.milestone.update({
//       where: {
//         id: findmilestone.id,
//       },
//       data: updateObj,
//       include: {
//         category: true,
//         reminder: true,
//         sticker: true,
//         message: true
//       }
//     });

//     if (!updatemilestone) {
//       throw new ValidationError("milestone not update")
//     }

//     handlerOk(res, 200, updatemilestone, "milestone updated successfully")

//   } catch (error) {
//     next(error)
//   }
// }

const editMilestone = async (req, res, next) => {
  try {
    const { milestoneId } = req.params;
    const { hostName, phoneNumber, message, title, date, categoryId, messageId, stickerId, reminderId, otherOptionId } = req.body;

    const findmilestone = await prisma.milestone.findUnique({
      where: {
        id: milestoneId
      }
    });

    if (!findmilestone) {
      throw new ValidationError("milestone id not found");
    }

    const findcategory = await prisma.mileStoneCategory.findUnique({
      where: {
        id: categoryId,
      }
    });

    if (!findcategory) {
      throw new NotFoundError("milestone category not found");
    }

    const findothercategory = await prisma.otherOptionRemiderCategory.findUnique({
      where: {
        id: otherOptionId,
      }
    });

    if (!findothercategory) {
      throw new NotFoundError("other milestone category not found");
    }

    const findremindercategory = await prisma.remiderCategory.findUnique({
      where: {
        id: reminderId,
      }
    });

    if (!findremindercategory) {
      throw new NotFoundError("reminder milestone category not found");
    }

    const findmessage = await prisma.message.findUnique({
      where: {
        id: messageId,
      }
    });

    if (!findmessage) {
      throw new NotFoundError("message not found");
    }

    let findsticker = null;
    if (stickerId) {
      findsticker = await prisma.sticker.findUnique({
        where: {
          id: stickerId,
        }
      });

      if (!findsticker) {
        throw new NotFoundError("sticker not found");
      }
    }

    const parsedDate = new Date(date);

    const updateObj = {};

    if (hostName) {
      updateObj.hostname = hostName;
    }

    if (phoneNumber) {
      updateObj.Phonenumber = phoneNumber;
    }

    if (message) {
      updateObj.hostmessage = message;
    }

    if (title) {
      updateObj.title = title;
    }

    if (date) {
      updateObj.date = parsedDate;
    }

    if (stickerId === "") {
      updateObj.stickerId = null; // Set stickerId to null if empty string
    }

    const updatemilestone = await prisma.milestone.update({
      where: {
        id: findmilestone.id,
      },
      data: updateObj,
      include: {
        category: true,
        reminder: true,
        sticker: true,
        message: true
      }
    });

    if (!updatemilestone) {
      throw new ValidationError("milestone not updated");
    }

    handlerOk(res, 200, updatemilestone, "milestone updated successfully");

  } catch (error) {
    next(error);
  }
};


const sendMilestoneToNumber = async (req, res, next) => {
  try {
    const { phoneNumber } = req.body;
    const { id } = req.user;
    const { milestoneId } = req.params;

    const findmilestone = await prisma.milestone.findUnique({
      where: {
        id: milestoneId,
        createdById: id
      }
    });

    if (!findmilestone) {
      throw new NotFoundError("milestone not found")
    }

    const findcontact = await prisma.contacts.findFirst({
      where: {
        phoneNumber: phoneNumber,
        createdById: id
      }
    });

    // if (!findcontact) {
    //   throw new NotFoundError("contact not found")
    // }

    await send_message({ type: "milestone", recipient: phoneNumber, value: findmilestone });

    handlerOk(res, 200, null, "message sent successfully")

  } catch (error) {
    next(error)
  }
}

const todayReminders = async (req, res, next) => {
  try {
    const { id } = req.user;

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);


    const findtodayreminder = await prisma.milestone.findMany({
      where: {
        createdById: id,
        date: {
          gte: startOfDay,
          lte: endOfDay
        }
      },
      include: {
        category: true,
        message: true,
        sticker: true,
        reminder: true
      }
    });

    if (findtodayreminder.length === 0) {
      // throw new NotFoundError("reminder not found")
      return res.status(200).json({
        success: false,
        message: "reminder not found",
      });
    }

    handlerOk(res, 200, findtodayreminder, "reminder found successfully");

  } catch (error) {
    next(error)
  }
}

const showMilestoneByDayWeekMonthYearly = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { range = "day" } = req.query;
    console.log(range);

    const now = new Date();
    let startDate, endDate;

    switch (range.toLowerCase()) {
      case "day":
        startDate = new Date(now.setHours(0, 0, 0, 0));
        endDate = new Date(now.setHours(23, 59, 59, 999));
        break;

      case "week":
        const day = now.getDay();
        const diff = day === 0 ? -6 : 1 - day;
        startDate = new Date(now);
        startDate.setDate(now.getDate() + diff);
        startDate.setHours(0, 0, 0, 0);

        endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);
        endDate.setHours(23, 59, 59, 999);
        break;

      case "month":
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
        break;

      case "year":
        startDate = new Date(now.getFullYear(), 0, 1);
        endDate = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
        break;

      default:
        throw new Error("Invalid range. Use 'day', 'week', 'month', or 'year'.");
    }

    const milestones = await prisma.milestone.findMany({
      where: {
        createdById: id,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        category: true,
        message: true,
        sticker: true,
        reminder: true,
      },
      orderBy: { date: 'asc' }
    });

    const calendarEvents = milestones.map(m => ({
      id: m.id,
      title: m.title,
      start: m.date,
      end: m.date,
      description: m.hostmessage,
      hostname: m.hostname,
      phoneNumber: m.Phonenumber,
      category: m.category?.name,
      message: m.message?.text,
      stickerUrl: m.sticker?.url,
      reminder: m.reminder?.name,
    }));

    handlerOk(res, 200, calendarEvents, `Milestones for this ${range} loaded successfully`);
  } catch (error) {
    next(error);
  }
};



module.exports = {

  showMileStoneCategory,
  showOtherMilestoneCategory,
  showReminderCategory,
  createMilestone,
  editMilestone,
  todayReminders,
  showMilestoneByDayWeekMonthYearly,
  showAllMilestone,
  sendMilestoneToNumber

}