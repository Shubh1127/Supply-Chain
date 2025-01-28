import { useState, useEffect, useRef } from 'react';
import { useFarmer } from '../../Context/FarmerContext';
import useChat from '../../Context/UseChat';
import { ChevronLeft } from 'lucide-react';

const FarmerChat = () => {
  const { farmer, buyers, messages, getMessagesByRoomId } = useFarmer();
  const [selectedBuyerId, setSelectedBuyerId] = useState(null);
  const [roomId, setRoomId] = useState('');
  const [loading, setLoading] = useState(true); // Add loading state
  const {
    newMessage,
    setNewMessage,
    sendMessage,
  } = useChat({ senderId: farmer?._id, receiverId: selectedBuyerId, roomId });

  const messageEndRef = useRef(null);
  const [shouldScroll, setShouldScroll] = useState(true);

  useEffect(() => {
    if (selectedBuyerId) {
      const generateRoomId = `${selectedBuyerId}-${farmer._id}`;
      setRoomId(generateRoomId);
      getMessagesByRoomId(generateRoomId)
        .then(() => setLoading(false)) // Set loading to false after fetching messages
        .catch(error => {
          console.error('Error fetching previous messages:', error);
          setLoading(false); // Set loading to false even if there's an error
        });
    }
  }, [selectedBuyerId, farmer, getMessagesByRoomId]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedBuyerId) {
        getMessagesByRoomId(roomId).catch(error => {
          console.error('Error fetching previous messages:', error);
        });
      }
    }, 5000); // Fetch messages every 5 seconds

    return () => clearInterval(interval);
  }, [selectedBuyerId, roomId, getMessagesByRoomId]);

  useEffect(() => {
    if (shouldScroll && messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
      setShouldScroll(false); // Reset shouldScroll after scrolling
    }
  }, [messages, shouldScroll]);

  const getBuyerName = (buyerId) => {
    const buyer = buyers.find(buyer => buyer._id === buyerId);
    return buyer ? buyer.name : 'Buyer';
  };

  const handleBack = () => {
    setSelectedBuyerId(null);
  };

  const handleScroll = () => {
    if (messageEndRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messageEndRef.current.parentElement;
      if (scrollTop + clientHeight < scrollHeight) {
        setShouldScroll(false);
      } else {
        setShouldScroll(true);
      }
    }
  };

  return (
    <div className='flex flex-col lg:flex-row h-full'>
      {!selectedBuyerId && (
        <div className='w-full lg:w-1/3 bg-white rounded-md p-4'>
          <h2 className='text-xl m-2'>Farmer Chat</h2>
          <div>
            <h3>Select a Buyer to Chat With:</h3>
            {buyers.map((buyer) => (
              <div key={buyer._id} className='border flex items-center gap-5 p-2 cursor-pointer' onClick={() => setSelectedBuyerId(buyer._id)} style={{ marginBottom: '10px' }}>
                <img src={buyer.profileImageUrl} className="w-7 h-7 rounded-full object-cover"/>
                <p>{buyer.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {selectedBuyerId && (
        <div className='w-full lg:w-2/3 bg-gray-100 rounded-md p-4 flex flex-col'>
          <span className='flex items-center relative top-13 left-[-15px] right-0 bg-gray-100 p-4 z-10'>
            <ChevronLeft className='cursor-pointer me-4' onClick={handleBack} />
            <img src={buyers.find(buyer => buyer._id === selectedBuyerId)?.profileImageUrl} className='w-8 h-8 rounded-full'/>
            <h3 className='text-xl font-semibold ms-2'> {buyers.find(buyer => buyer._id === selectedBuyerId)?.name}</h3>
          </span>
          <div className='overflow-y-auto flex-grow flex flex-col mt-16' onScroll={handleScroll}>
            {loading ? (
              <p>Loading messages...</p>
            ) : (
              <>
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`p-2 my-2 flex flex-col rounded-md w-max ${msg.senderId === farmer._id ? 'bg-green-200 self-end' : 'bg-white self-start'}`}
                    style={{
                      border: msg.senderId === farmer._id ? '2px solid green ' : '2px solid white',
                      alignSelf: msg.senderId === farmer._id ? 'flex-end' : 'flex-start',
                      maxWidth: '60%',
                    }}
                  >
                    <strong>{msg.senderId === farmer._id ? 'You' : getBuyerName(msg.senderId)}</strong> {msg.message}
                  </div>
                ))}
                <div ref={messageEndRef} />
              </>
            )}
          </div>
          <div className='flex mt-4'>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className='flex-grow p-2 border rounded-md'
              onKeyPress={(e) => {
                if (e.key === 'Enter' && newMessage.trim()) {
                  sendMessage().then(() => {
                    setShouldScroll(true); // Set shouldScroll to true after sending a message
                  }).catch(error => {
                    console.error('Error sending message:', error);
                  });
                }
              }}
            />
            <button onClick={() => {
              sendMessage().then(() => {
                setShouldScroll(true); // Set shouldScroll to true after sending a message
              }).catch(error => {
                console.error('Error sending message:', error);
              });
            }} className='ml-2 p-2 bg-blue-500 text-white rounded-md'>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerChat;