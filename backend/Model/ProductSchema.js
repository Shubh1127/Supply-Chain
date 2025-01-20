const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String, 
    },
    category:{
        type:String,
        required: true,
    },
    quantity: {
        type: Number, 
        default: 1 ,
        required: true
    },
    farmerId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Farmer', 
        required: true 
    },
    date:{
        type: Date,
        default: Date.now
    }
});
const ProductModel = mongoose.model('Product', ProductSchema);
module.exports = ProductModel;