const adminRouter = require("express").Router();
const adminAuthRouter = require("./adminAuth");
const adminContentRouter = require("./adminContent")
const adminLibraryRouter = require("./adminLibrary")
const adminMilestoneRouter = require("./adminMilestone")

adminRouter.use("/auth", adminAuthRouter);
adminRouter.use("/content", adminContentRouter);
adminRouter.use("/library", adminLibraryRouter);
adminRouter.use("/milestone", adminMilestoneRouter);











module.exports = adminRouter;