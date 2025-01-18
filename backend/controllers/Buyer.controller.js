const BuyerModel = require('../Model/BuyerSchema');
const cloudinary = require('../config/cloudinaryConfig');
const jwt = require('jsonwebtoken');

module.exports.register = async (req, res) => {
  try {
    const { name, email, password, phoneNumber } = req.body;
    let profilePhotoUrl = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'Buyers/ProfilePhotos',
      });
      profilePhotoUrl = result.secure_url;
    }
    const hashedPassword = await BuyerModel.hashPassword(password);
    const isBuyerExist = await BuyerModel.findOne({ email });
    if (isBuyerExist) {
      return res.status(400).json({ message: 'Buyer already exists' });
    }
    const buyer = await BuyerModel.create({
      name,
      email,
      password: hashedPassword,
      phone: phoneNumber,
      profileImageUrl: profilePhotoUrl,
     
    });
    const token = buyer.generateAuthToken();
    return res.status(201).json({ message: 'Buyer registered successfully', token: token, buyer: buyer });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const buyer = await BuyerModel.findOne({ email });
    if (!buyer) {
      return res.status(400).json({ message: 'Invalid email' });
    }
    const isMatch = await buyer.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }
    const token = buyer.generateAuthToken();
    res.cookie('token', token);
    return res.status(200).json({ token, buyer });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.logout = (req, res) => {
  res.clearCookie('token');
  return res.status(200).json({ message: 'Logged out successfully' });
};

module.exports.getProfile = async (req, res) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Please login first' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const buyer = await BuyerModel.findById(decoded._id);
    if (!buyer) {
      return res.status(400).json({ message: 'Buyer not found' });
    }
    return res.status(200).json({
      buyer: {
        name: buyer.name,
        email: buyer.email,
        phone: buyer.phone,
        addresses: buyer.addresses, // Returning addresses as an array
        profileImageUrl: buyer.profileImageUrl,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.updateProfile = async (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Please login first' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const buyer = await BuyerModel.findById(decoded._id);
    if (!buyer) {
      return res.status(401).json({ message: 'Invalid token or user not found' });
    }

    const { name, email, phone, addresses } = req.body; // Expecting an array of addresses
    let profileImageUrl = buyer.profileImageUrl;
    if (req.file) {
      if (buyer.profileImageUrl) {
        const publicId = buyer.profileImageUrl.match(/buyers\/ProfilePhotos\/(.*)\./);
        await cloudinary.uploader.destroy(publicId);
      }
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'buyer/ProfilePhotos', // Cloudinary folder
      });
      profileImageUrl = result.secure_url;
    }

    // Updating buyer with the new address array and other profile details
    const updatedBuyer = await BuyerModel.findByIdAndUpdate(
      decoded._id,
      {
        name,
        email,
        phone,
        addresses, // Updating the addresses array
        profileImageUrl,
      },
      { new: true }
    );

    return res.status(200).json({
      buyer: {
        name: updatedBuyer.name,
        email: updatedBuyer.email,
        phone: updatedBuyer.phone,
        profileImageUrl: updatedBuyer.profileImageUrl,
        addresses: updatedBuyer.addresses, // Returning updated addresses
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Something went wrong.' });
  }
};
