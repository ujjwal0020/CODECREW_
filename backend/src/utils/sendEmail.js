const nodemailer = require("nodemailer");
require("dotenv").config();

const sendWelcomeEmail = async (to, name) => {
    try{
  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });

  const mailOptions = {
    from: '"DevTinder👋" <no-reply@myapp.com>',
    to,
    subject: "Welcome to DevTinder!",
    html: `<h2>Hello ${name},</h2>
    <p>Thanks for signing up with DevTinder! 🎉</p>
     <p>We're excited to have you! 🎉</p>`,
  };

  await transporter.sendMail(mailOptions);
  console.log(`Email sent to ${to}`);
} catch (err) {
    console.error("Error sending email:", err);
}
};

module.exports = sendWelcomeEmail;
