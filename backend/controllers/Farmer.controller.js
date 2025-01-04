const FarmerModel=require('../Model/FarmerSchema');

module.exports.register=async(req,res)=>{
    try{
        const {name,email,password,phoneNumber}=req.body;
        const hashedPassword=await FarmerModel.hashPassword(password);
        const isFarmerExist=await FarmerModel.findOne({email});
        if(isFarmerExist){
            return res.status(400).json({message:'Farmer already exist'});
        }
        const Farmer=await FarmerModel.create({
            name:name,
            email:email,
            password:hashedPassword,
            phone:phoneNumber
        })
        const token=Farmer.generateAuthToken();
        
    res.status(201).json({message:'Farmer registered successfully',token:token});
}catch(err){
    res.status(500).json({message:err.message});
}
}

module.exports.login=async(req,res)=>{
    const {email,password}=req.body;
    const Farmer=await FarmerModel.findOne({email});
    if(!Farmer){
        return res.status(400).json({message:'Farmer not found'});
    }
    const isMatch=await Farmer.comparePassword(password);

    if(!isMatch){
        return res.status(400).json({message:'Invalid password'})
    }

    const token=Farmer.generateAuthToken();

    res.cookie('token',token)

    res.status(200).json({token,Farmer});
}