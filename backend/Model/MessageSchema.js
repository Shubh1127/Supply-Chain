const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId, // Refers to the user ID of the sender
    required: true,
    ref: 'User', // Assuming you have a User model
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId, // Refers to the user ID of the receiver
    required: true,
    ref: 'User', // Assuming you have a User model
  },
  message: {
    type: String, // The content of the message
    required: true,
    trim: true,
  },
  timeStamp: {
    type: Date, // The time the message was sent
    default: Date.now, // Automatically sets the current date and time
  },
  roomId: {
    type: String, // The room ID where the message was sent
    required: true,
  },
});

module.exports = mongoose.model('Message', MessageSchema);
