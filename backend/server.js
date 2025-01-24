require('dotenv').config();
const http = require('http');
const app = require('./app');
const { Server } = require('socket.io');
const Message=require('./Model/MessageSchema');

// Create the server with Express app
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server);

// Handle Socket.IO connections
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('joinRoom', ({ roomId, userName, userId }) => {
        socket.join(roomId);
        console.log(`${userName} joined room: ${roomId}`);
        socket.to(roomId).emit('userJoined', `${userName} has joined the room`);
    });

    socket.on('chatMessage', ({ roomId, message, userName, userId }) => {
        // Save message to the database
        const newMessage = new Message({
            roomId,
            message,
            userName,
            userId,
            timestamp: new Date()
        });

        newMessage.save().then(() => {
            // Emit the message to the room
            io.to(roomId).emit('newMessage', { userName, message, userId });
        });
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
});

// Listen on port 3000
server.listen(3000, () => {
    console.log('Server is running on port: 3000');
});
