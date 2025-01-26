import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useBuyer } from '../../../Context/BuyerContext';
import useChat from '../../../Context/UseChat';
import Header from '../components/BuyerHeader';

const ChatComponent = () => {
  const { productId } = useParams();
  const {
    buyer,
    messages,
    farmers,
    productFarmer,
    chatFarmer,
    getMessagesByRoomId,
    getConversations,
    getFarmerByProductId,
  } = useBuyer();
  const [selectedFarmerId, setSelectedFarmerId] = useState(null);
  const [roomId, setRoomId] = useState('');
  const [dataFetched, setDataFetched] = useState(false);
  const {
    newMessage,
    setNewMessage,
    sendMessage,
  } = useChat({ senderId: buyer?._id, receiverId: selectedFarmerId, roomId });

  useEffect(() => {
    if (buyer && !dataFetched) {
      getConversations(buyer._id);
      setDataFetched(true);
    }
  }, [buyer, getConversations, dataFetched]);

  useEffect(() => {
    if (productId && !dataFetched) {
      getFarmerByProductId(productId);
      setDataFetched(true);
    }
  }, [productId, getFarmerByProductId, dataFetched]);

  useEffect(() => {
    if (chatFarmer) {
      setSelectedFarmerId(chatFarmer._id);
    }
  }, [chatFarmer]);

  useEffect(() => {
    if (selectedFarmerId) {
      const generateRoomId = `${buyer._id}-${selectedFarmerId}`;
      setRoomId(generateRoomId);
      getMessagesByRoomId(generateRoomId); // Fetch messages for the selected room
    }
  }, [selectedFarmerId, buyer, getMessagesByRoomId]);

  const getFarmerName = (farmerId) => {
    const farmer =
      farmers.find((farmer) => farmer._id === farmerId) ||
      (farmerId === chatFarmer?._id ? chatFarmer : null);
    return farmer ? farmer.name : 'Farmer';
  };

  return (
    <>
      <Header />
      <div className='flex h-full'>
        <div className='w-1/3 bg-white rounded-md p-4'>
          <h2 className='text-xl m-2'>Buyer Chat</h2>
          <div>
            <h3>Select a Farmer to Chat With:</h3>
            {farmers.length ? (
              farmers.map((farmer) => (
                <div key={farmer._id} className='border flex items-center gap-5 p-2 cursor-pointer' onClick={() => setSelectedFarmerId(farmer._id)} style={{ marginBottom: '10px' }}>
                  <img src={farmer.profileImageUrl} className="w-7 h-7 rounded-full object-cover"/>
                  <p>{farmer.name}</p>
                </div>
              ))
            ) : (
              chatFarmer && (
                <div className='border flex items-center gap-5 p-2 cursor-pointer' onClick={() => setSelectedFarmerId(chatFarmer._id)} style={{ marginBottom: '10px' }}>
                  <p>{chatFarmer.name}</p>
                </div>
              )
            )}
          </div>
        </div>
        {selectedFarmerId && (
          <div className='w-2/3 bg-gray-100 rounded-md p-4'>
            <h3 className='text-xl font-semibold'> {getFarmerName(selectedFarmerId)}</h3>
            <div className='overflow-y-auto h-4/5 flex flex-col'>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 my-2 flex flex-col rounded-md w-max ${msg.senderId === buyer._id ? 'bg-green-200 self-end' : 'bg-white self-start'}`}
                  style={{
                    border: msg.senderId === buyer._id ? '2px solid green' : '2px solid white',
                    alignSelf: msg.senderId === buyer._id ? 'flex-end' : 'flex-start',
                    maxWidth: '60%',
                  }}
                >
                  <strong>{msg.senderId === buyer._id ? 'You' : getFarmerName(msg.senderId)}</strong> {msg.message}
                </div>
              ))}
            </div>
            <div className='flex mt-4'>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className='flex-grow p-2 border rounded-md'
              />
              <button onClick={sendMessage} className='ml-2 p-2 bg-blue-500 text-white rounded-md'>Send</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatComponent;