require('dotenv').config();
const http=require('http');
const app=require('./app');

const Server=http.createServer(app);

Server.listen(3000,()=>{
    console.log('Server is running on port:3000');
})