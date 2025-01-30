const nodemailer = require('nodemailer');
async function sendOTPEmail(userEmail, otpCode) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail', 
    auth: {
      user: process.env.EMAIL_USER, // your gmail account
      pass: process.env.EMAIL_PASS // your gmail password 
    }
  });

  // Email details
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: 'Reset Password',
    html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2 style="color: #333;">Action Required: One-Time Verification Code</h2>
      <p>You are receiving this email because a request was made for a one-time code that can be used for authentication.</p>
      <p style="font-size: 1.2em; font-weight: bold;">Please enter the following code for verification:</p>
      <p style="font-size: 1.5em; font-weight: bold; color: #007BFF;">${otpCode}</p>
      <p>If you did not request this change, please change your password or contact us.</p>
    </div>
  `
  };

  // Send the email
  await transporter.sendMail(mailOptions);
}

module.exports = { sendOTPEmail };