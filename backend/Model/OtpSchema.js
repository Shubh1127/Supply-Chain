const mongoose = require('mongoose');

const OtpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true // Ensure each email has only one OTP document
    },
    otp: {
        type: String, // You can use String or Number
        required: true
    },
    expires: {
        type: Date,
        required: true
    }
});

const OTPModel = mongoose.model('OTP', OtpSchema); 
module.exports = OTPModel;