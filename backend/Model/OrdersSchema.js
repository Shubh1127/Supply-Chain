const mongoose=require('mongoose');
const orderSchema = new mongoose.Schema({
    order_id: {
        type: Number,
        required: true
    },
    buyer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Buyer',
        required: true
    },
    seller_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farmer',
        required: true
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    order_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'], // Example statuses
        default: 'Pending'
    }
        
});
const OrdersModel=mongoose.model('Orders',orderSchema);
module.exports=OrdersModel;