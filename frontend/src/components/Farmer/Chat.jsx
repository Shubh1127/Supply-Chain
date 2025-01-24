import useChat from '../../Context/UseChat';
const Chat = () => {
    
    const roomId = 'room1'; // Use room ID based on your needs
    const userName = 'Farmer John'; 
    const { message, setMessage, messages, handleSendMessage } = useChat(roomId, userName);

    return (
        <div>
            <h2>Farmer Chat Room</h2>
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
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
};

export default Chat;
