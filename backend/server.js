require('dotenv').config();
const http = require('http');
const app = require('./app');
const socketIo = require('socket.io');
const Message=require('./Model/MessageSchema');
const { timeStamp } = require('console');
const server = http.createServer(app);

// Initialize Socket.IO
const io =socketIo(server,{
  cors:{
    origin:"*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  }
})
io.on('connection', (socket) => {
  // console.log('New client connected', socket.id);

  socket.on('joinRoom', ({ roomId }) => {
    socket.join(roomId);
    // console.log('Room Joined', roomId);
  });

  socket.on('sendMessage', async ({ roomId, senderId, receiverId, message }) => {
    const messageData = {
      roomId,
      senderId,
      receiverId,
      message,
      timeStamp: Date.now(),
    };

    // console.log('Message Data', messageData);

    try {
      // Check if the room already exists
      const existingMessages = await Message.find({ roomId });
      // if (existingMessages.length > 0) {
      //   // console.log(`Appending to existing room: ${roomId}`);
      // } else {
      //   // console.log(`Creating new room: ${roomId}`);
      // }

      // Save the new message
      const savedMessage = await Message.create(messageData);
      // console.log('Message saved', savedMessage);

      // Emit the message to all clients in the room
      io.to(roomId).emit('recieveMessage', messageData);
      // console.log(`Message from ${senderId} to ${receiverId} in room ${roomId}: ${message}`);
    } catch (err) {
      console.error('Error saving Message', err);
    }
  });

  socket.on('disconnect', () => {
    // console.log(`Client disconnected: ${socket.id}`);
  });
});


// Listen on port 3000
server.listen(3000, () => {
    console.log('Server is running on port: 3000');
});