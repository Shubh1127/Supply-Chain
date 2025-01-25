import React from 'react';
import { useChat } from '../../../Context/UseChat';

const BuyerChat = ({ currentUserId, roomId, farmerId }) => {
  const {
    messages,
    newMessage,
    setNewMessage,
    sendMessage,
    setOtherUserId,
  } = useChat({ currentUserId, roomId });

  // Set the farmer's ID as the other user
  React.useEffect(() => {
    setOtherUserId(farmerId);
  }, [farmerId, setOtherUserId]);

  return (
    <div>
      <h2>Buyer Chat</h2>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.senderId === currentUserId ? 'You' : 'Farmer'}:</strong>{' '}
            {msg.content}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default BuyerChat;
