const userRouter = require("express").Router();
const userAuthRouter = require("./userAuth");
const userContentRouter = require("./userContent");
const userLibraryRouter = require("./userLibrary");
const userContactRouter = require("./userContact");
const userMilestoneRouter = require("./userMilestone");
const userNotificationRouter = require("./userNotification");


userRouter.use("/auth", userAuthRouter);
userRouter.use("/content", userContentRouter);
userRouter.use("/library", userLibraryRouter);
userRouter.use("/contact", userContactRouter);
userRouter.use("/milestone", userMilestoneRouter);
userRouter.use("/notification", userNotificationRouter);




module.exports = userRouter;