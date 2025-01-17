const FarmerModel=require('../Model/FarmerSchema');
const ProductModel=require('../Model/ProductSchema')
const cloudinary=require('../config/cloudinaryConfig')
const axios=require('axios');
const jwt=require('jsonwebtoken');
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
          profileImageUrl: farmer.profileImageUrl, 
          address: farmer.address,
        },
      });
    } catch (error) {
      return res.status(400).json({ message: 'Invalid token.' });
    }
  };
  
  module.exports.updateProfile = async (req, res) => {
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
  
      const { name, email, phone, address } = req.body;
      let profileImageUrl = farmer.profileImageUrl;
      if (req.file) {
        if(farmer.profileImageUrl){
          const publicId = farmer.profileImageUrl.match(/Farmers\/ProfilePhotos\/(.*)\./)[1];
          await cloudinary.uploader.destroy(publicId);
        }
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'Farmers/ProfilePhotos', // Cloudinary folder
        });
        profileImageUrl = result.secure_url; 
      }
      const updatedFarmer = await FarmerModel.findByIdAndUpdate(
        decoded._id,
        {
          name,
          email,
          phone,
          address,
          profileImageUrl, 
        },
        { new: true }
      );
  
      return res.status(200).json({
        farmer: {
          name: updatedFarmer.name,
          email: updatedFarmer.email,
          phone: updatedFarmer.phone,
          profileImageUrl: updatedFarmer.profileImageUrl,
          address: updatedFarmer.address,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: 'Something went wrong.' });
    }
  };
  
  
  module.exports.addProduct = async (req, res) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'Please login first' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const farmer = await FarmerModel.findById(decoded._id);

        if (!farmer) {
            return res.status(401).json({ message: 'Invalid token or user not found' });
        }

        const { name, description, price ,quantity} = req.body;
        let productPhotoUrl = null;

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'Products/Photos',
            });
            productPhotoUrl = result.secure_url;
        }

        const product = await ProductModel.create({
            name,
            description,
            price,
            quantity,
            photo: productPhotoUrl,
            farmerId: farmer._id,
        });

        return res.status(201).json({
            message: 'Product added successfully',
            product,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


module.exports.getProducts = async (req, res) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'Please login first' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const farmer = await FarmerModel.findById(decoded._id);

        if (!farmer) {
            return res.status(401).json({ message: 'Invalid token or user not found' });
        }
        const products = await ProductModel.find({ farmerId:decoded._id });
        return res.status(200).json({ products });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports.Weather = async (req, res) => {
  try {
    const apiKey = process.env.WEATHER_API_KEY;
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${req.query.lat}&lon=${req.query.lon}&appid=${apiKey}&units=metric`);
    return res.status(200).json(response.data);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};