const sgMail = require("@sendgrid/mail");
require("dotenv").config();

console.log("SendGrid Key yeh hi hai:", process.env.SENDGRID_API_KEY);
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = async (to, name) => {
  try {
    const msg = {
      to,
      from: {
        email: "gshikhar04@gmail.com",
        name: "DevTinder 👋",
      },
      subject: "Welcome to DevTinder!",
      html: `
        <h2>Hello ${name},</h2>
        <p>Thanks for signing up with <strong>DevTinder</strong>! 🎉</p>
        <p>We're excited to have you on board.</p>
        <p>Explore, connect, and build meaningful dev friendships!</p>
      `,
    };

    await sgMail.send(msg);
    console.log(`✅ Welcome email sent to ${to}`);
  } catch (error) {
    console.error("❌ Error sending welcome email:", error);
  }
};

module.exports = sendWelcomeEmail;
