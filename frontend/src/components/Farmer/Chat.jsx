import  { useState, useEffect } from 'react';
import { useFarmer } from '../../Context/FarmerContext';
import useChat from '../../Context/UseChat';

const FarmerChat = () => {
  const { farmer, buyers } = useFarmer();
  const [selectedBuyerId, setSelectedBuyerId] = useState(null);
  const [roomId, setRoomId] = useState('');
  const {
    messages,
    newMessage,
    setNewMessage,
    sendMessage,
  } = useChat({ senderId: farmer?._id, receiverId: selectedBuyerId, roomId });
  console.log(selectedBuyerId, farmer?._id);
  useEffect(() => {
    if (selectedBuyerId) {
      const generateRoomId = `${farmer._id}-${selectedBuyerId}`;
      setRoomId(generateRoomId);
    }
  }, [selectedBuyerId, farmer]);

  return (
    <div className='bg-white rounded-md p-4 h-screen'>
      <h2 className='text-xl m-2'>Farmer Chat</h2>
      <div>
        <h3>Select a Buyer to Chat With:</h3>
        {buyers.map((buyer) => (
          <div key={buyer._id} className='border' onClick={() => setSelectedBuyerId(buyer._id)} style={{ cursor: 'pointer', marginBottom: '10px' }}>
            <p>Name: {buyer.name}</p>
          </div>
        ))}
      </div>
      {selectedBuyerId && (
        <div>
          <h3>Chat with {buyers.find(buyer => buyer.id === selectedBuyerId)?.name}</h3>
          <div>
            {messages.map((msg, index) => (
              <p key={index}>
                <strong>{msg.senderId === farmer._id ? 'You' : 'Buyer'}:</strong> {msg.content}
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
      )}
    </div>
  );
};

export default FarmerChat;