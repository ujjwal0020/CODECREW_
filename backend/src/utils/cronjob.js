// cron/dailyRequestReminder.js
const cron = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const sendEmail = require("../utils/sendEmail");
const ConnectionRequestModel = require("../models/connectionRequest");

// Runs every day at 8:00 AM
cron.schedule("0 8 * * *", async () => {
  try {
    const yesterday = subDays(new Date(), 1);
    const yesterdayStart = startOfDay(yesterday);
    const yesterdayEnd = endOfDay(yesterday);

    const pendingRequests = await ConnectionRequestModel.find({
      status: "interested",
      createdAt: { $gte: yesterdayStart, $lt: yesterdayEnd },
    }).populate("senderId receiverId");

    const uniqueEmails = [
      ...new Set(pendingRequests.map((req) => req.receiverId.emailId)),
    ];

    console.log("📬 Emails to send:", uniqueEmails);

    for (const email of uniqueEmails) {
      try {
        const html = `
          <h2>You Have New Friend Requests!</h2>
          <p>Someone showed interest in connecting with you on DevTinder.</p>
          <p>Log in to DevTinder to respond to the requests.</p>
        `;
        await sendEmail(email, "New Friend Requests Awaiting!", html);
      } catch (emailErr) {
        console.error(`❌ Error sending email to ${email}:`, emailErr.message);
      }
    }
  } catch (err) {
    console.error("❌ Cron job failed:", err.message);
  }
});
