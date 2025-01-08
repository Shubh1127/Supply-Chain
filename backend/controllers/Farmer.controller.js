const FarmerModel=require('../Model/FarmerSchema');
const cloudinary=require('../config/cloudinaryConfig')
module.exports.register=async(req,res)=>{
    try{
        const {name,email,password,phoneNumber}=req.body;
        let profilePhotoUrl=null;
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
              folder: 'Farmers/ProfilePhotos', // Cloudinary folder
            });
            profilePhotoUrl = result.secure_url;
          }
        const hashedPassword=await FarmerModel.hashPassword(password);
        const isFarmerExist=await FarmerModel.findOne({email});
        if(isFarmerExist){
            return res.status(400).json({message:'Farmer already exist'});
        }
        // console.log('profilePhotoUrl',profilePhotoUrl)
        const Farmer=await FarmerModel.create({
            name:name,
            email:email,
            password:hashedPassword,
            phone:phoneNumber,
            profileImageUrl: profilePhotoUrl,
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