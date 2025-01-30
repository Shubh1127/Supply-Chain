const OTPModel = require('../Model/OtpSchema'); // Import the OTP model
const { sendOTPEmail } = require('../utils/sendEmail'); // Import the email utility

module.exports = async function ForgotPassword(req, res, next) {
    const { email } = req.body;

    // Validate email
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Convert to string

    try {
        // Store or update the OTP in the database
        const storeOtp = await OTPModel.updateOne(
            { email },
            {
                email,
                otp,
                expires: new Date(Date.now() + 600000) // Set expiration to 10 minutes from now
            },
            { upsert: true } // Create a new document if it doesn't exist
        );

        // Send the OTP via email
        await sendOTPEmail(email, otp); // Await the email sending function

        // Proceed to the next middleware
        next();
    } catch (err) {
        console.error('Error sending OTP:', err);
        return res.status(500).json({ message: 'Error sending OTP' });
    }
};