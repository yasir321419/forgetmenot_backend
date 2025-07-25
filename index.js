const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 4000;
const API_PRIFEX = '/api/v1';  // Prefix for all routes
const rootRouter = require("./routes/index");
const globalErrorMiddleware = require("./middleware/globalMiddleware");
const dbConnect = require('./db/connectivity');
const cron = require("node-cron");
const checkAndSendReminderNotifications = require('./utils/sendReminderNotification');
const adminSeed = require('./seeder/adminseed');

require("dotenv").config();

app.use(cors());
app.use('/public', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(API_PRIFEX, rootRouter);

// Global error handling
app.use(globalErrorMiddleware);

app.get("/", (req, res) => {
  res.send("server is running");
});

dbConnect();

adminSeed();


cron.schedule("* * * * *", async () => {
  console.log("running");

  await checkAndSendReminderNotifications()

});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});