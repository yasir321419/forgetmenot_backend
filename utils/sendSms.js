require("dotenv").config();

const twilio = require("twilio");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);


// const send_message = async ({ type, value, recipient, messageBody }) => {
//   try {
//     if (type === "milestone" && value) {
//       // Value here is expected to be the milestone object
//       messageBody = `Milestone Alert 📌\n\nTitle: ${value.title}\nDate: ${value.date}\nHost: ${value.hostname}\nMessage: ${value.hostmessage || 'No message provided.'}`;
//     }

//     const message = await client.messages.create({
//       body: messageBody,
//       from: process.env.NUMBER,
//       to: recipient,
//     });

//     console.log("Sent message: " + message.body);
//   } catch (error) {
//     console.log("Error details:", error.details);
//     console.log("Error code:", error.code);
//     console.log("Error message:", error.message);
//   }
// };

const sendMilestoneWithSticker = async ({ phoneNumber, milestone, stickerUrl }) => {
  try {
    // Prepare the message body
    const messageBody = `Milestone Alert 📌\n\nTitle: ${milestone.title}\nDate: ${milestone.date}\nHost: ${milestone.hostname}\nMessage: ${milestone.hostmessage || 'No message provided.'}`;

    // Construct the message options for MMS
    const messageOptions = {
      body: messageBody,
      from: process.env.NUMBER,  // Your Twilio number
      to: phoneNumber,
    };

    // Attach the sticker (image) if a URL is provided
    if (stickerUrl) {
      messageOptions.mediaUrl = [stickerUrl]; // Multiple stickers can be added as an array
    }

    // Send the message via Twilio
    const message = await client.messages.create(messageOptions);

    console.log("Sent message: " + message.body);
    return message;
  } catch (error) {
    console.error("Error sending message:", error);
    throw new Error("Error sending milestone message with sticker");
  }
};

module.exports = sendMilestoneWithSticker;



