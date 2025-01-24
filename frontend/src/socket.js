import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3000'; // Backend URL
const socket = io(SOCKET_URL, {
    autoConnect: false, // Prevents immediate connection, allowing room-specific join
});

// Connect to a specific room
export const joinRoom = (roomId, userName) => {
    socket.connect();
    socket.emit('joinRoom', { roomId, userName });
};

// Send a message
export const sendMessage = (roomId, message, userName) => {
    socket.emit('chatMessage', { roomId, message, userName });
};

// Listen for new messages
export const listenForMessages = (callback) => {
    socket.on('newMessage', (data) => {
        callback(data); // Executes the provided callback when a new message is received
    });
};

// Disconnect from the server
export const disconnectSocket = () => {
    socket.disconnect();
};

// Export the socket instance in case of direct usage
export default socket;
