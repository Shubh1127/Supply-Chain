const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const BuyerSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    socketid:{
        type:String,
    },
    profileImageUrl:{
        type:String,
    },
    address:{
        type:String,
    },
    orders: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, required: true },
            orderDate: { type: Date, default: Date.now },
            totalPrice: { type: Number, required: true } // Optional field for total price of the order
        }
    ]
});

BuyerSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'});
    return token;
}
BuyerSchema.methods.comaprePassword=async function(password){
    return await bcrypt.compare(password,this.password);
}

BuyerSchema.statics.hashPassword=async function(password){
    return await bcrypt.hash(password,10);
}

const BuyerModel=mongoose.model('Buyer',BuyerSchema);

module.exports=BuyerModel;