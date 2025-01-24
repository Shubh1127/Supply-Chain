const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
    roomId: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,  // Store the user ID as an ObjectId
        required: true,
        refPath: 'userType',  // This dynamically determines which model to reference
    },
    userType: {  // This field stores the model name ('Buyer' or 'Farmer')
        type: String,
        required: true,
        enum: ['Buyer', 'Farmer'],  // Only allows Buyer or Farmer
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

// Optional: Index for faster queries by room and timestamp
messageSchema.index({ roomId: 1, timestamp: 1 });

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
