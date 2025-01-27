require('dotenv').config();
const http = require('http');
const app = require('./app');
const socketIo = require('socket.io');
const path = require('path');
const express = require('express');
const Message=require('./Model/MessageSchema');
// const { timeStamp } = require('console');
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, 'build')));
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
    try {
      const savedMessage = await Message.create(messageData);
      io.to(roomId).emit('recieveMessage', messageData);
    } catch (err) {
      console.error('Error saving Message', err);
    }
  });

  socket.on('disconnect', () => {
  });
});


// Listen on port 3000
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));