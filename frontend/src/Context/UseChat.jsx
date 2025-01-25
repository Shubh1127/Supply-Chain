import {useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket=io('http://localhost:3000')


export const useChat=({currentUserId,roomId})=>{
    const [messages,setMessages]=useState([]);
    const [newMessage,setNewMessage]=useState('');
    const [otherUserId,setOtherUserId]=useState('');

    useEffect(()=>{
        socket.emit('joinRoom',{roomId})

        socket.on('recieveMessage',(message)=>{
            setMessages((prev)=>[...prev,message])
        })
        return ()=>{
            socket.disconnect();
        };
    },[roomId])

    const sendMessage=()=>{
        if(newMessage.trim()){
            const message={
                roomId,
                senderId:currentUserId,
                receiverId:otherUserId,
                message:newMessage
            };

            socket.emit('sendMessage',message);

            setMessages((prev)=>[...prev,message]);

            setNewMessage('');
        }
    };
    return {
        messages,
        newMessage,
        setNewMessage,
        sendMessage,
        setOtherUserId
    }
}