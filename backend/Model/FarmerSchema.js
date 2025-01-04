const mongoose = require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const FarmerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    socketid:{
        type:String,
    }
});

FarmerSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'});
    return token;
}
FarmerSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password);
}

FarmerSchema.statics.hashPassword=async function(password){
    return await bcrypt.hash(password,10);
}

const FarmerModel = mongoose.model('Farmer',FarmerSchema);

module.exports = FarmerModel;