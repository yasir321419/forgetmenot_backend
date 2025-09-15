const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const morgan = require('morgan');

const rootRouter = require('./routes/index');
const globalErrorMiddleware = require('./middleware/globalMiddleware');
const dbConnect = require('./db/connectivity');

const adminSeed = require('./seeder/adminseed');
const messageSeed = require('./seeder/messageseed');
const mileStoneCategory = require('./seeder/milestonecategoryseed');
const otherMileStoneCategory = require('./seeder/othermilestonecatergoryseed');
const reminderCategory = require('./seeder/remindercategoryseed');
// const stickerSeed = require('./seeder/stickerseed');

const cron = require('node-cron');

const app = express();

// ---- Env & config ----
const PORT = Number(process.env.PORT || 4000);
const HOST = process.env.HOST || '127.0.0.1';
const API_PREFIX = process.env.API_PRIFEX || '/api/v1';

console.log('[BOOT] API_PREFIX =', API_PREFIX);
console.log('[BOOT] PORT =', PORT, 'HOST =', HOST);

// ---- Middlewares ----
app.use(cors());
app.use(morgan('dev'));
app.use('/public', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ---- Health endpoint (must be early) ----
let bootStatus = { db: 'pending', seeds: 'pending', startedAt: null };
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    db: bootStatus.db,
    seeds: bootStatus.seeds,
    startedAt: bootStatus.startedAt,
  });
});

// ---- API routes ----
app.use(API_PREFIX, rootRouter);

// ---- Global error handler ----
app.use(globalErrorMiddleware);

// ---- Root route (optional) ----
app.get('/', (_req, res) => {
  res.send('server is running...!!!');
});

// ---- Hardening: catch unhandled errors to log them rather than instant-exit ----
process.on('unhandledRejection', (reason, p) => {
  console.error('[UNHANDLED REJECTION]', reason);
});
process.on('uncaughtException', (err) => {
  console.error('[UNCAUGHT EXCEPTION]', err);
});

// ---- Startup sequence ----
async function start() {
  try {
    // 1) Connect DB (fail here is expected/logged & prevents start)
    await dbConnect();
    bootStatus.db = 'connected';
    console.log('[BOOT] Database connected');

    // 2) Seed safely (don’t crash app if seed fails—log and continue)
    try {
      await adminSeed();
      await messageSeed();
      await mileStoneCategory();
      await otherMileStoneCategory();
      await reminderCategory();
      // await stickerSeed();
      bootStatus.seeds = 'done';
      console.log('[BOOT] Seeders completed');
    } catch (seedErr) {
      bootStatus.seeds = 'failed';
      console.error('[BOOT] Seeder error (continuing):', seedErr);
    }

    // 3) Start HTTP server
    app.listen(PORT, HOST, () => {
      bootStatus.startedAt = new Date().toISOString();
      console.log(`[BOOT] Server listening on http://${HOST}:${PORT}`);
    });

    // 4) Start cron AFTER app up; wrap in try/catch inside task
    cron.schedule('* * * * *', async () => {
      try {
        // Lazy import to avoid require-time errors
        const checkAndSendReminderNotifications = require('./utils/sendReminderNotification');
        await checkAndSendReminderNotifications();
        // console.log('[CRON] Reminder job ticked');
      } catch (e) {
        console.error('[CRON] Reminder job error:', e.message || e);
      }
    });
  } catch (e) {
    // DB fatal error – log why we can’t start and exit non-zero so PM2 restarts
    console.error('[BOOT] Fatal startup error, cannot start server:', e.message || e);
    process.exit(1);
  }
}

start();
