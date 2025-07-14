// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// const { ForbiddenError, UnAuthorizedError } = require('../handler/CustomError');

// const toArray = (val) => Array.isArray(val) ? val : [val];

// const validateFreePlanUsage = async (userId, messageId, stickerId) => {
//   const activeSubscription = await prisma.userSubscription.findFirst({
//     where: {
//       userId: userId,
//       isActive: true,
//       endDate: { gte: new Date() }
//     },
//     include: {
//       subscriptionPlan: true
//     }
//   });

//   if (!activeSubscription) {
//     throw new UnAuthorizedError("You don't have an active subscription.");
//   }

//   const planName = activeSubscription.subscriptionPlan.name;

//   const messageIds = toArray(messageId).map(String);
//   const stickerIds = toArray(stickerId).map(String);

//   const plans = {
//     Free: {
//       maxMilestones: 3,
//       allowedMessages: Array.from({ length: 2 }, (_, i) => i + 1),
//       allowedStickers: Array.from({ length: 3 }, (_, i) => i + 1),
//     },
//     Individual: {
//       maxMilestones: 30,
//       allowedMessages: Array.from({ length: 10 }, (_, i) => i + 1),
//       allowedStickers: Array.from({ length: 20 }, (_, i) => i + 1),
//     },
//     Business: {
//       maxMilestones: 30,
//       allowedMessages: Array.from({ length: 25 }, (_, i) => i + 1),
//       allowedStickers: Array.from({ length: 50 }, (_, i) => i + 1),
//     },
//     Corporate: {
//       maxMilestones: 50,
//       allowedMessages: Array.from({ length: 100 }, (_, i) => i + 1),
//       allowedStickers: null, // no restriction
//     }
//   };

//   const plan = plans[planName];
//   if (!plan) return;

//   const milestoneCount = await prisma.milestone.count({
//     where: { createdById: userId }
//   });

//   if (milestoneCount >= plan.maxMilestones) {
//     throw new ForbiddenError(`${planName} plan users can only create up to ${plan.maxMilestones} milestones.`);
//   }

//   for (const mid of messageIds) {
//     if (!plan.allowedMessages.includes(mid)) {
//       throw new ForbiddenError(`Message template ID ${mid} is not allowed on the ${planName} plan.`);
//     }
//   }

//   if (plan.allowedStickers) {
//     for (const sid of stickerIds) {
//       if (!plan.allowedStickers.includes(sid)) {
//         throw new ForbiddenError(`Sticker ID ${sid} is not allowed on the ${planName} plan.`);
//       }
//     }
//   }
// };

// module.exports = {
//   validateFreePlanUsage
// };


const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const { ForbiddenError, UnAuthorizedError } = require('../handler/CustomError');

const toArray = (val) => Array.isArray(val) ? val : [val];

const validateFreePlanUsage = async (userId, messageId, stickerId) => {
  // 1. Get user's active subscription
  const activeSubscription = await prisma.userSubscription.findFirst({
    where: {
      userId,
      isActive: true,
      endDate: { gte: new Date() }
    },
    include: {
      subscriptionPlan: true
    }
  });

  if (!activeSubscription) {
    throw new UnAuthorizedError("You don't have an active subscription.");
  }

  const planName = activeSubscription.subscriptionPlan.name;

  // Normalize inputs to arrays of strings
  const messageIds = toArray(messageId).map(String);
  const stickerIds = toArray(stickerId).map(String);

  // Plan configuration
  const planLimits = {
    Free: {
      maxMilestones: 3,
      validateTemplatesAndStickers: true
    },
    Individual: {
      maxMilestones: 30,
      validateTemplatesAndStickers: false
    },
    Business: {
      maxMilestones: 30,
      validateTemplatesAndStickers: false
    },
    Corporate: {
      maxMilestones: 50,
      validateTemplatesAndStickers: false
    }
  };

  const plan = planLimits[planName];
  if (!plan) {
    throw new UnAuthorizedError("Invalid subscription plan.");
  }

  // 2. Milestone limit check
  const milestoneCount = await prisma.milestone.count({
    where: { createdById: userId }
  });

  if (milestoneCount >= plan.maxMilestones) {
    throw new ForbiddenError(`${planName} plan users can only create up to ${plan.maxMilestones} milestones.`);
  }

  // 3. Extra checks only for Free plan
  if (plan.validateTemplatesAndStickers) {
    // ✅ Fetch allowed message templates
    const allowedMessages = await prisma.message.findMany({
      where: {
        id: { in: messageIds },
        // isFree: true
      },
      select: { id: true }
    });

    const allowedStickers = await prisma.sticker.findMany({
      where: {
        id: { in: stickerIds },
        // isFree: true
      },
      select: { id: true }
    });

    const allowedMessageIds = allowedMessages.map(m => m.id);
    const allowedStickerIds = allowedStickers.map(s => s.id);

    // ❌ Block if user tries to use non-free message
    for (const mid of messageIds) {
      if (!allowedMessageIds.includes(mid)) {
        throw new ForbiddenError(`Message ID ${mid} is not allowed on the Free plan.`);
      }
    }

    // ❌ Block if user tries to use non-free sticker
    for (const sid of stickerIds) {
      if (!allowedStickerIds.includes(sid)) {
        throw new ForbiddenError(`Sticker ID ${sid} is not allowed on the Free plan.`);
      }
    }
  }
};

module.exports = {
  validateFreePlanUsage
};

