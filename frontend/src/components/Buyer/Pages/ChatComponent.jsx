// import { useState } from 'react';
import { useBuyer } from '../../../Context/BuyerContext';
import { useChat } from '../../../Context/UseChat';

const BuyerChatComponent = () => {
    const { buyer, item } = useBuyer();
    const { message, setMessage, messages, handleSendMessage } = useChat();
    
    // Get farmerId from item if available
    if (item?.farmerId) {
        localStorage.setItem('item', JSON.stringify(item));
    }
    
    const farmerId = localStorage.getItem('item') ? JSON.parse(localStorage.getItem('item')).farmerId : null;
    
    const roomId = 'room1'; // Replace with actual room ID as needed
    const userName = buyer.name || 'Buyer Bob'; // Replace with dynamic buyer name

    // Function to send message to the backend
    const sendMessageToBackend = async () => {
        // Prepare the message data to send
        const messageData = {
            roomId: roomId,
            message: message,
            userName: userName,
            userId: buyer._id, // Pass the buyer's user ID
            userType: 'Buyer', // Since the user is a Buyer in this case
        };

        try {
            // Make a POST request to the backend
            const response = await fetch('http://localhost:5000/api/messages/send-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(messageData),
            });

            // Handle response from backend
            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            // Parse the response
            const data = await response.json();
            console.log('Message sent:', data);

            // Optionally, update the state with the new message
            // For example, you can append the sent message to the messages list
            setMessage(''); // Clear input field
            // You could also add the new message to local state if needed
            // messages.push(data); // Append new message to messages
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    // Handle the send message button click
    const handleSendButtonClick = () => {
        if (message.trim()) {
            sendMessageToBackend();
        }
    };

    return (
        <div>
            <h2>Buyer Chat Room</h2>
            <div>
                {messages.map((msg, index) => (
                    <p key={index}>
                        <strong>{msg.userName}:</strong> {msg.message}
                    </p>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
            />
            <button onClick={handleSendButtonClick}>Send</button>
        </div>
    );
};

export default BuyerChatComponent;
