const BuyerModel=require('../Model/BuyerSchema');
const cloudinary=require('../config/cloudinaryConfig')

module.exports.register=async(req,res)=>{
    try{
        const {name,email,password,phone,ProfileImageUrl}=req.body;
        let profilePhotoUrl=null;
        if(req.file){
            const result=await cloudinary.uploader.upload(req.file.path,{
                folder:'Buyers/ProfilePhotos',
            })
            profilePhotoUrl=result.secure_url;
        }
        const hashedPassword=await BuyerModel.hashedPassword(password);
        const isBuyerExist=await BuyerModel.findOne({email});
        if(isBuyerExist){
            return res.status(400).json({message:'Buyer already exists'});
        }
        const buyer=new BuyerModel.create({
            name,
            email,
            password:hashedPassword,
            phone,
            profileImageUrl:profilePhotoUrl,
        })
        const token=buyer.generateAuthToken();
        return res.status(201).json({message:'Buyer registered successfully',token:token,buyer:buyer});
    }catch(err){
        res.status(500).json({message:err.message});
    }
}
module.exports.login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const buyer=await BuyerModel.findOne({email});
        if(!buyer){
            return res.status(400).json({message:'Invalid email or password'});
    }   
    const isMatch=await buyer.comparePassword(password);
    if(!isMatch){
        return res.status(400).json({message:'Invalid email or password'});
    }
    const token=buyer.generateAuthToken();
    res.cookie('token',token);
    return res.status(200).json({token,buyer});
}catch(err){
    res.status(500).json({message:err.message});
}
}

module.exports.logout=(req,res)=>{
    res.clearCookie('token');
    return res.status(200).json({message:'Logged out successfully'});
}

module.exports.getProfile=async(req,res)=>{
    try{
        const token=req.header('Authorization').replace('Bearer ','');
        if(!token){
            return res.status(401).json({message:'Please login first'});
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const buyer=await BuyerModel.findById(decoded._id);
        if(!buyer){
            return res.status(400).json({message:'Buyer not found'});
        }
        return res.status(200).json({buyer:{
            name:buyer.name,
            email:buyer.email,
            phone:buyer.phone,
            profileImageUrl:buyer.profileImageUrl,
        }});
    }catch(err){
        res.status(500).json({message:err.message});
    }
}

module.exports.updateProfile = async (req, res) => {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      if (!token) {
        return res.status(401).json({ message: 'Please login first' });
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const buyer = await BuyerModel.findById(decoded._id);
      if (!buyer) {
        return res.status(400).json({ message: 'Buyer not found' });
      }
  
      const { name, email, phone, password } = req.body;
      const updates = {};
  
      // Update fields only if provided
      if (name) updates.name = name;
      if (email) updates.email = email;
      if (phone) updates.phone = phone;
      if (password) {
        const hashedPassword = await BuyerModel.hashPassword(password); // Assuming you have a method to hash passwords
        updates.password = hashedPassword;
      }
  
      // Handle profile image update
      if (req.file) {
        // Delete the previous profile image from Cloudinary
        if (buyer.profileImageUrl) {
          const publicId = buyer.profileImageUrl.split('/').pop().split('.')[0]; // Extract public ID from URL
          await cloudinary.uploader.destroy(`Buyers/ProfilePhotos/${publicId}`);
        }
  
        // Upload the new profile image
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'Buyers/ProfilePhotos',
        });
        updates.profileImageUrl = result.secure_url;
      }
  
      // Apply updates to the buyer document
      Object.assign(buyer, updates);
      await buyer.save();
  
      return res.status(200).json({
        message: 'Profile updated successfully',
        buyer: {
          name: buyer.name,
          email: buyer.email,
          phone: buyer.phone,
          profileImageUrl: buyer.profileImageUrl,
        },
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };
