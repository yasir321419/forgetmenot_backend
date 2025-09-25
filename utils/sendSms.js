
require("dotenv").config();

const twilio = require("twilio");
const { formatInTimeZone } = require("date-fns-tz"); // ✅ tz-aware formatter
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const sendMilestoneWithSticker = async ({ phoneNumber, milestone, stickerUrl }) => {
  try {
    // 1) Ensure we interpret DB value as UTC
    //    If milestone.date lacks a trailing 'Z', add it: e.g. "2025-06-23T00:00:00.000Z"
    const utcInput = new Date(milestone.date);

    // 2) Target Canada timezone (Eastern example)
    const timeZone = "America/Toronto";

    // 3) Format exactly: Mon Jun 23 2025 05:00:00  (no GMT suffix)
    const formattedDate = formatInTimeZone(
      utcInput,
      timeZone,
      "EEE MMM dd yyyy HH:mm:ss"
    );

    // 4) Build body
    const messageBody =
      `Milestone Alert 📌\n\n` +
      `Title: ${milestone.title}\n` +
      `Date: ${formattedDate}\n` +
      `Host: ${milestone.hostname}\n` +
      `Message: ${milestone.hostmessage || 'No message provided.'}`;

    console.log(messageBody, 'message');


    // 5) SEND the SMS (🚫 remove the early return)
    const messageOptions = {
      body: messageBody,
      from: process.env.NUMBER,
      to: phoneNumber,
      ...(stickerUrl ? { mediaUrl: [stickerUrl] } : {})
    };

    const message = await client.messages.create(messageOptions);
    console.log("Sent message:", message.body);
    return message;
  } catch (error) {
    console.error("Error sending message:", error);
    throw new Error("Error sending milestone message with sticker");
  }
};

module.exports = sendMilestoneWithSticker;
