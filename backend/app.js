const express = require('express');
const app = express();
const FarmerRoutes=require('./routes/Farmer.routes.js');
const BuyerRoutes=require('./routes/Buyer.routes.js');
const cookieParser = require('cookie-parser');
const connectDB = require('./db/db');
const ProductModel=require('./Model/ProductSchema');
const Data=require('./Data/Data.js');
const cors=require('cors');
require('dotenv').config();
app.use(cors({origin:'http://localhost:5173',credentials:true}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
connectDB();
const insertData=async()=>{
    await ProductModel.deleteMany({});
    await ProductModel.insertMany(Data);
}
insertData();
app.get('/',(req,res)=>{
    res.send('Hello World');
});
app.use('/farmer',FarmerRoutes);
app.use('/buyer',BuyerRoutes);
module.exports = app;


