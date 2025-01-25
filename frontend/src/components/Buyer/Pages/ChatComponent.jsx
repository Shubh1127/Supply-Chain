import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useBuyer } from '../../../Context/BuyerContext';
import useChat from '../../../Context/UseChat';
import axios from 'axios';

const ChatComponent = () => {
  const { productId } = useParams();
  const { buyer } = useBuyer();
  const [roomId, setRoomId] = useState('');
  const [farmerId, setFarmerId] = useState(null);
   console.log(buyer?._id)
  const {
    messages,
    newMessage,
    setNewMessage,
    sendMessage,
  } = useChat({ senderId: buyer?._id, receiverId: farmerId, roomId });
  console.log(farmerId)
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/buyer/product/${productId}`);
        const product = response.data.product;
        setFarmerId(product.farmerId);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);
  useEffect(() => {
    if (farmerId) {
      const generateRoomId = `${buyer._id}-${farmerId}`;
      setRoomId(generateRoomId);
    }
  }, [farmerId, buyer]);

  return (
    <div>
      <h2>Buyer Chat</h2>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.senderId === buyer._id ? 'You' : 'Farmer'}:</strong> {msg.content}
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

export default ChatComponent;