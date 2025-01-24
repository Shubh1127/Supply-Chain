import { useState, useEffect } from 'react';
import { joinRoom, sendMessage, listenForMessages, disconnectSocket } from '../socket';

const useChat = (roomId, userName) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        joinRoom(roomId, userName);
        listenForMessages(({ userName, message }) => {
            setMessages((prev) => [...prev, { userName, message }]);
        });

        // Cleanup on component unmount
        return () => {
            disconnectSocket();
        };
    }, [roomId, userName]);

    const handleSendMessage = () => {
        if (message.trim()) {
            sendMessage(roomId, message, userName);
            setMessage('');
        }
    };

    return {
        message,
        setMessage,
        messages,
        handleSendMessage,
    };
};

export default useChat;
