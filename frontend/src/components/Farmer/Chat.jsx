import { useChat } from "../../Context/UseChat";
import React from 'react';
const FarmerChat=({currentUserId,roomId,buyerId})=>{
    const {
        messages,
        newMessage,
        setNewMessage,
        sendMessage,
        setOtherUserId
    }=useChat({currentUserId,roomId});

    React.useEffect(()=>{
        setOtherUserId(buyerId);
    },[buyerId,setOtherUserId])
    return (
        <div>
            <h2>Farmer Chat</h2>
            <div>
                {messages.map((msg,index)=>{
                    <p key={index}>
                        <strong>{msg.senderId===currentUserId ? 'You': 'Buyer'}:</strong>{''}
                        {msg.message}
                        </p>
                })}

            </div>
            <input
                type="text"
                value={newMessage}
                onChange={(e)=>setNewMessage(e.target.value)}
                placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    )
}
export default FarmerChat;