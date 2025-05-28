const express = require("express");
const router = express.Router();
const sendWelcomeEmail = require("../utils/sendEmail");

router.get("/test-email", async (req, res) => {
  try {
    await sendWelcomeEmail("ujjwalenrg1@gmail.com", "Ujjwal");
    res.send("✅ Test email sent successfully");
  } catch (err) {
    console.error("❌ Email error:", err.response?.body || err.message || err);
    res.status(500).send("❌ Failed to send test email");
  }
});

module.exports = router;
