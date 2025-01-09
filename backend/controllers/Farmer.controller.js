const FarmerModel=require('../Model/FarmerSchema');
const cloudinary=require('../config/cloudinaryConfig')
module.exports.register = async (req, res) => {
    try {
      const { name, email, password, phoneNumber } = req.body;
      let profilePhotoUrl = null;
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'Farmers/ProfilePhotos', // Cloudinary folder
        });
        profilePhotoUrl = result.secure_url;
      }
      
      const hashedPassword = await FarmerModel.hashPassword(password);
      const isFarmerExist = await FarmerModel.findOne({ email });
      if (isFarmerExist) {
        return res.status(400).json({ message: 'Farmer already exists' });
      }
  
      const Farmer = await FarmerModel.create({
        name,
        email,
        password: hashedPassword,
        phone: phoneNumber,
        profileImageUrl: profilePhotoUrl,
      });
  
      const token = Farmer.generateAuthToken(); // Generate token after registration
  
      return res.status(201).json({
        message: 'Farmer registered successfully',
        token: token,
        farmer: Farmer, 
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

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

    return res.status(200).json({token,farmer:Farmer});
}

module.exports.logout=(req,res)=>{
    res.clearCookie('token')
    return res.status(200).json({message:'Logged out successfully'})
}

module.exports.getProfile = async (req, res) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
  
    if (!token) {
      return res.status(401).json({ message: 'Please login first' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); 
      const farmer = await FarmerModel.findById(decoded._id); 
  
      if (!farmer) {
        return res.status(401).json({ message: 'Invalid token or user not found' });
      }
  
      return res.status(200).json({
        farmer: {
          name: farmer.name,
          email: farmer.email,
          phone: farmer.phone,
          profileImageUrl: farmer.profileImageUrl, // Assuming profile image is stored in this field
        },
      });
    } catch (error) {
      return res.status(400).json({ message: 'Invalid token.' });
    }
  };
  
