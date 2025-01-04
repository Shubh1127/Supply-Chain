require('dotenv').config();
const http=require('http');
const app=require('./app');
const cors=require('cors');
const Server=http.createServer(app);
app.use(cors({origin:'*',credentials:true}));
Server.listen(3000,()=>{
    console.log('Server is running on port:3000');
})