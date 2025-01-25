require('dotenv').config();
const http = require('http');
const app = require('./app');
const socketIo = require('socket.io');
const Message=require('./Model/MessageSchema');
const { timeStamp } = require('console');
const server = http.createServer(app);

// Initialize Socket.IO
const io =socketIo(server,{
  cors:{
    origin:"*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  }
})
io.on('connection', (socket) => {
  console.log('New client connected',socket.id);


  socket.on('joinRoom',({buyerId,farmerId,productId})=>{
    let roomId;
    if(productId){
      roomId=`${farmerId}-${productId}`;
    }else{
      roomId=`${buyerId}-${farmerId}`;
    }
    socket.join(roomId);
    console.log('Room Joined',roomId);
  })

  socket.on('sendMessage',async ({roomId,senderId,receiverId,message})=>{
    const Message={
      senderId,
      receiverId,
      message,
      timeStamp:Date.now()
    }
    try{
      const savedMesasage=await Message.create(messageData);
      console.log('Message saved',savedMesasage); 
    }catch(err){
      console.error('Error saving Message',err);
    }
    io.to(roomId).emit('recieveMessage',messageData)
    console.log(`Message from ${senderId} to ${receiverId}  in room ${roomId}: ${message}`);
  })
  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
})


// Listen on port 3000
server.listen(3000, () => {
    console.log('Server is running on port: 3000');
});