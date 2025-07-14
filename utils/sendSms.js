require("dotenv").config();

const twilio = require("twilio");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);


const send_message = async ({ type, value, recipient, messageBody }) => {
  try {
    if (type === "milestone" && value) {
      // Value here is expected to be the milestone object
      messageBody = `Milestone Alert 📌\n\nTitle: ${value.title}\nDate: ${value.date}\nHost: ${value.hostname}\nMessage: ${value.hostmessage || 'No message provided.'}`;
    }

    const message = await client.messages.create({
      body: messageBody,
      from: process.env.NUMBER,
      to: recipient,
    });

    console.log("Sent message: " + message.body);
  } catch (error) {
    console.log("Error details:", error.details);
    console.log("Error code:", error.code);
    console.log("Error message:", error.message);
  }
};




module.exports = send_message;
