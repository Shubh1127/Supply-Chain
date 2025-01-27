import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useBuyer } from '../../../Context/BuyerContext';
import useChat from '../../../Context/UseChat';
import Header from '../components/BuyerHeader';
import { Ellipsis } from 'lucide-react';

const ChatComponent = () => {
  const { productId } = useParams();
  const {
    buyer,
    messages,
    farmers,
    chatFarmer,
    getMessagesByRoomId,
    getConversations,
    deleteMessage,
    getFarmerByProductId,
  } = useBuyer();
  const [selectedFarmerId, setSelectedFarmerId] = useState(null);
  const [roomId, setRoomId] = useState('');
  const [dataFetched, setDataFetched] = useState(false);
  const [showDeleteOption, setShowDeleteOption] = useState(null);
  const [showMessageBox, setShowMessageBox] = useState(false);
  const {
    newMessage,
    setNewMessage,
    sendMessage,
  } = useChat({ senderId: buyer?._id, receiverId: selectedFarmerId, roomId });

  const messageEndRef = useRef(null);
  const [shouldScroll, setShouldScroll] = useState(true);

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
    if (buyer && selectedFarmerId) {
      const generateRoomId = `${buyer._id}-${selectedFarmerId}`;
      setRoomId(generateRoomId);
      getMessagesByRoomId(generateRoomId).catch(error => {
        console.error('Error fetching previous messages:', error);
      }); // Fetch messages for the selected room
      setShowMessageBox(true);
    }
  }, [selectedFarmerId, buyer, getMessagesByRoomId]);

  useEffect(() => {
    if (shouldScroll && messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
      setShouldScroll(false); // Reset shouldScroll after scrolling
    }
  }, [messages, shouldScroll]);

  const getFarmerName = (farmerId) => {
    const farmer =
      farmers.find((farmer) => farmer._id === farmerId) ||
      (farmerId === chatFarmer?._id ? chatFarmer : null);
    return farmer ? farmer.name : 'Farmer';
  };

  const handleDeleteMessage = (messageId) => {
    deleteMessage(messageId);
    setShowDeleteOption(null);
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest('.message-container')) {
      setShowDeleteOption(null);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && newMessage.trim()) {
      sendMessage().then(() => {
        setShouldScroll(true); // Set shouldScroll to true after sending a message
      }).catch(error => {
        console.error('Error sending message:', error);
      });
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      sendMessage().then(() => {
        setShouldScroll(true); // Set shouldScroll to true after sending a message
      }).catch(error => {
        console.error('Error sending message:', error);
      });
    }
  };

  const handleBack = () => {
    setShowMessageBox(false);
    setSelectedFarmerId(null);
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
    <>
      <Header />
      <div className='flex flex-col lg:flex-row h-[90vh]'>
        <div className={`w-full lg:w-1/3 bg-white rounded-md p-4 ${showMessageBox ? 'hidden lg:block' : 'block'}`}>
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
          <div className='w-full lg:w-2/3 h-full bg-gray-100 rounded-md p-4 flex flex-col'>
            <button onClick={handleBack} className='lg:hidden mb-4 text-blue-500'>Back</button>
            <h3 className='text-xl font-semibold'>{getFarmerName(selectedFarmerId)}</h3>
            <div className='overflow-y-auto flex-grow flex flex-col' onScroll={handleScroll}>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message-container cursor-pointer p-2 my-2 flex flex-col rounded-md w-max relative ${msg.senderId === buyer._id ? 'bg-green-200 self-end' : 'bg-white self-start'}`}
                  style={{
                    border: msg.senderId === buyer._id ? '2px solid green' : '2px solid white',
                    alignSelf: msg.senderId === buyer._id ? 'flex-end' : 'flex-start',
                    maxWidth: '60%',
                  }}
                  onClick={() => setShowDeleteOption(msg._id)}
                >
                  <strong>{msg.senderId === buyer._id ? 'You' : getFarmerName(msg.senderId)}</strong> {msg.message}
                  {showDeleteOption === msg._id && (
                    <div className={`absolute top-0 ${msg.senderId === buyer._id ? 'left-[-50px]' : 'right-[-50px]'} p-1`}>
                      <Ellipsis className='cursor-pointer' />
                      {showDeleteOption === msg._id && (
                        <div className='absolute top-0 bg-white border rounded shadow-md p-2'>
                          <button onClick={() => handleDeleteMessage(msg._id)} className='text-red-500 text-sm'>Delete Message</button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
              <div ref={messageEndRef} />
            </div>
            <div className='flex mt-4'>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className='flex-grow p-2 border rounded-md'
                onKeyPress={handleKeyPress}
              />
              <button onClick={handleSendMessage} className='ml-2 p-2 bg-blue-500 text-white rounded-md'>Send</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatComponent;