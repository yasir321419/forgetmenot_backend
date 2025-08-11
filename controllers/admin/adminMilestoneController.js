const prisma = require("../../config/prismaConfig");
const { ConflictError, ValidationError, NotFoundError } = require("../../handler/CustomError");
const { handlerOk } = require("../../handler/resHandler");

const createMilestoneCategory = async (req, res, next) => {
  try {
    const { category } = req.body;
    const { id } = req.user;
    const findmilestonecategory = await prisma.mileStoneCategory.findFirst({
      where: {
        name: category,
      }
    });

    if (findmilestonecategory) {
      throw new ConflictError("already category exist")
    }

    const createcategory = await prisma.mileStoneCategory.create({
      data: {
        name: category,
        createdById: id
      }
    });

    if (!createcategory) {
      throw new ValidationError("category not created")
    }

    handlerOk(res, 200, createcategory, "category created successfully");

  } catch (error) {
    next(error)
  }
}

const showMilestoneCategory = async (req, res, next) => {
  try {
    const { id } = req.user;

    const findmilestonecategory = await prisma.mileStoneCategory.findMany({
      where: {
        createdById: id
      }
    });

    if (findmilestonecategory.length === 0) {
      // throw new NotFoundError("milestone category not found")

      return res.status(200).json({
        success: false,
        message: "milestone category not found",
      });
    }

    handlerOk(res, 200, findmilestonecategory, "milestone category found successfully");
  } catch (error) {
    next(error)
  }
}

const editMilestoneCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const { category } = req.body;
    const { id } = req.user;

    const findmilestonecategory = await prisma.mileStoneCategory.findUnique({
      where: {
        id: categoryId,
        createdById: id
      }
    });

    if (!findmilestonecategory) {
      throw new NotFoundError("milestone category id not found")
    }

    const updatecategory = await prisma.mileStoneCategory.update({
      where: {
        id: findmilestonecategory.id,
        createdById: id
      },
      data: {
        name: category
      }
    });

    if (!updatecategory) {
      throw new ValidationError("milestone category not update")
    }

    handlerOk(res, 200, updatecategory, "milestone category updated successfully");

  } catch (error) {
    next(error)
  }
}

const deleteMilestoneCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const { id } = req.user;

    const findmilestonecategory = await prisma.mileStoneCategory.findUnique({
      where: {
        id: categoryId,
        createdById: id
      }
    });

    if (!findmilestonecategory) {
      throw new NotFoundError("milestone category id not found")
    }

    const deletecategory = await prisma.mileStoneCategory.delete({
      where: {
        id: findmilestonecategory.id,
        createdById: id
      }
    });

    if (!deletecategory) {
      throw new ValidationError("milestone category not deleted")
    }

    handlerOk(res, 200, null, "milestone category deleted successfully");

  } catch (error) {
    next(error)
  }
}

const createOtherMilestoneOption = async (req, res, next) => {
  try {
    const { othercategory } = req.body;
    const { id } = req.user;
    const findothermilestonecategory = await prisma.otherOptionRemiderCategory.findFirst({
      where: {
        name: othercategory,
      }
    });

    if (findothermilestonecategory) {
      throw new ConflictError("already other category exist")
    }

    const createcategory = await prisma.otherOptionRemiderCategory.create({
      data: {
        name: othercategory,
        createdById: id
      }
    });

    if (!createcategory) {
      throw new ValidationError("other category not created")
    }

    handlerOk(res, 200, createcategory, "other category created successfully");
  } catch (error) {
    next(error)
  }

}

const showOtherMilestoneOption = async (req, res, next) => {
  try {
    const { id } = req.user;

    const findmilestonecategory = await prisma.otherOptionRemiderCategory.findMany({
      where: {
        createdById: id
      }
    });

    if (findmilestonecategory.length === 0) {
      throw new NotFoundError("other milestone category not found")
    }

    handlerOk(res, 200, findmilestonecategory, "other milestone category found successfully");

  } catch (error) {
    next(error)
  }
}

const editOtherMilestoneOption = async (req, res, next) => {
  try {
    const { otherCategoryId } = req.params;
    const { othercategory } = req.body;
    const { id } = req.user;

    const findmilestonecategory = await prisma.otherOptionRemiderCategory.findUnique({
      where: {
        id: otherCategoryId,
        createdById: id
      }
    });

    if (!findmilestonecategory) {
      throw new NotFoundError("other milestone category id not found")
    }

    const updatecategory = await prisma.otherOptionRemiderCategory.update({
      where: {
        id: findmilestonecategory.id,
        createdById: id
      },
      data: {
        name: othercategory
      }
    });

    if (!updatecategory) {
      throw new ValidationError("other milestone category not update")
    }

    handlerOk(res, 200, updatecategory, "other milestone category updated successfully");

  } catch (error) {
    next(error)
  }
}

const deleteOtherMilestoneOption = async (req, res, next) => {
  try {
    const { otherCategoryId } = req.params;
    const { id } = req.user;

    const findothermilestonecategory = await prisma.otherOptionRemiderCategory.findUnique({
      where: {
        id: otherCategoryId,
        createdById: id
      }
    });

    if (!findothermilestonecategory) {
      throw new NotFoundError("other milestone category id not found")
    }

    const deletecategory = await prisma.otherOptionRemiderCategory.delete({
      where: {
        id: findothermilestonecategory.id,
        createdById: id
      }
    });

    if (!deletecategory) {
      throw new ValidationError("other milestone category not deleted")
    }

    handlerOk(res, 200, null, "other milestone category deleted successfully");

  } catch (error) {
    next(error)
  }
}

const createReminderOption = async (req, res, next) => {
  try {
    const { reminderCategory } = req.body;
    const { id } = req.user;
    const findremindermilestonecategory = await prisma.remiderCategory.findFirst({
      where: {
        name: reminderCategory,
      }
    });

    if (findremindermilestonecategory) {
      throw new ConflictError("already reminder category exist")
    }

    const createcategory = await prisma.remiderCategory.create({
      data: {
        name: reminderCategory,
        createdById: id
      }
    });

    if (!createcategory) {
      throw new ValidationError("reminder category not created")
    }

    handlerOk(res, 200, createcategory, "reminder category created successfully");

  } catch (error) {
    next(error)
  }
}

const showReminderOption = async (req, res, next) => {
  try {
    const { id } = req.user;

    const findremindermilestonecategory = await prisma.remiderCategory.findMany({
      where: {
        createdById: id
      }
    });

    if (findremindermilestonecategory.length === 0) {
      throw new NotFoundError("reminder milestone category not found")
    }

    handlerOk(res, 200, findremindermilestonecategory, "reminder milestone category found successfully");
  } catch (error) {
    next(error)
  }
}

const editReminderOption = async (req, res, next) => {
  try {
    const { reminderCategoryId } = req.params;
    const { reminderCategory } = req.body;
    const { id } = req.user;

    const findremindermilestonecategory = await prisma.remiderCategory.findUnique({
      where: {
        id: reminderCategoryId,
        createdById: id
      }
    });

    if (!findremindermilestonecategory) {
      throw new NotFoundError("reminder milestone category id not found")
    }

    const updatecategory = await prisma.remiderCategory.update({
      where: {
        id: findremindermilestonecategory.id,
        createdById: id
      },
      data: {
        name: reminderCategory
      }
    });

    if (!updatecategory) {
      throw new ValidationError("reminder milestone category not update")
    }

    handlerOk(res, 200, updatecategory, "reminder milestone category updated successfully");

  } catch (error) {
    next(error)
  }
}

const deleteReminderOption = async (req, res, next) => {
  try {
    const { reminderCategoryId } = req.params;
    const { id } = req.user;

    const findremindermilestonecategory = await prisma.remiderCategory.findUnique({
      where: {
        id: reminderCategoryId,
        createdById: id
      }
    });

    if (!findremindermilestonecategory) {
      throw new NotFoundError("reminder milestone category id not found")
    }

    const deletecategory = await prisma.remiderCategory.delete({
      where: {
        id: findremindermilestonecategory.id,
        createdById: id
      }
    });

    if (!deletecategory) {
      throw new ValidationError("reminder milestone category not deleted")
    }

    handlerOk(res, 200, null, "reminder milestone category deleted successfully");
  } catch (error) {
    next(error)
  }
}


module.exports = {
  createMilestoneCategory,
  showMilestoneCategory,
  editMilestoneCategory,
  deleteMilestoneCategory,
  createOtherMilestoneOption,
  showOtherMilestoneOption,
  editOtherMilestoneOption,
  deleteOtherMilestoneOption,
  createReminderOption,
  showReminderOption,
  editReminderOption,
  deleteReminderOption
}