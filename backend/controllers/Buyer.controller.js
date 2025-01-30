const Farmer = require('../Model/FarmerSchema'); // Import the Farmer model
const BuyerModel = require('../Model/BuyerSchema');
const ProductModel=require('../Model/ProductSchema')
const cloudinary = require('../config/cloudinaryConfig');
const Message=require('../Model/MessageSchema');
const FarmerModel=require('../Model/FarmerSchema')
const OTPModel=require('../Model/OtpSchema');
const { sendOTPEmail }=require('../utils/sendEmail');
const jwt = require('jsonwebtoken');
const Fuse = require('fuse.js');
const bcrypt = require('bcrypt');

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
    // 
    // .log(buyer._id)
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
        _id: buyer._id,
        name: buyer.name,
        email: buyer.email,
        phone: buyer.phone,
        addresses: buyer.addresses, 
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
//address
module.exports.addAddress = async (req, res) => {
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

    const { houseNo, street, city, state, pincode } = req.body;
    const newAddress = { houseNo, street, city, state, pincode };

    buyer.addresses.push(newAddress);
    await buyer.save();

    return res.status(200).json({ message: 'Address added successfully', buyer });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Something went wrong.' });
  }
};

module.exports.updateAddress = async (req, res) => {
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

    const { index } = req.params;
    const { houseNo, street, city, state, pincode } = req.body;

    if (index >= 0 && index < buyer.addresses.length) {
      buyer.addresses[index] = { houseNo, street, city, state, pincode };
      await buyer.save();
      return res.status(200).json({ message: 'Address updated successfully', addresses: buyer.addresses ,buyer});
    } else {
      return res.status(400).json({ message: 'Invalid address index' });
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Something went wrong.' });
  }
};

module.exports.deleteAddress = async (req, res) => {
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

    const { index } = req.params;

    if (index >= 0 && index < buyer.addresses.length) {
      buyer.addresses.splice(index, 1);
      await buyer.save();
      return res.status(200).json({ message: 'Address deleted successfully', buyer });
    } else {
      return res.status(400).json({ message: 'Invalid address index' });
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Something went wrong.' });
  }
};

module.exports.setDefaultAddress = async (req, res) => {
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

    const { index } = req.params;

    if (index >= 0 && index < buyer.addresses.length) {
      buyer.addresses.forEach((address, i) => {
        address.isDefault = i === parseInt(index);
      });
      await buyer.save();
      return res.status(200).json({ message: 'Default address set successfully', buyer });
    } else {
      return res.status(400).json({ message: 'Invalid address index' });
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Something went wrong.' });
  }
};

//orders and cart
module.exports.getOrders = async (req, res) => {
  const token=req.header('Authorization').replace('Bearer ','');
  if(!token){
    return res.status(401).json({message:'Please login first'});
  }
  try{
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    const buyer=await BuyerModel.findById(decoded._id);
    if(!buyer){
      return res.status(401).json({message:'Invalid token or user not found'});
    }
    return res.status(200).json({orders:buyer.orders});
  }
  catch(error){
    console.error(error);
    return res.status(500).json({message:'Something went wrong'});
  }
};

module.exports.addToCart = async (req, res) => {
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
    const { productId, quantity } = req.body;
    if (!productId) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }
    const quantityToAdd = quantity ? quantity : 1;
    const cartItemIndex = buyer.cart.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (cartItemIndex !== -1) {
      buyer.cart[cartItemIndex].quantity += quantityToAdd;
    } else {
      buyer.cart.push({ productId, quantity: quantityToAdd });
    }
    await buyer.save();
    res.status(200).json({ message: 'Item added to cart successfully', cart: buyer.cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports.getCart = async (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Please login first' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const buyer = await BuyerModel.findById(decoded._id).populate({
      path: 'cart.productId',
      model: 'Product',
      select: 'name price photo description farmerId' 
    });
    if (!buyer) {
      return res.status(401).json({ message: 'Invalid token or user not found' });
    }
    // console.log(buyer.cart)

    const cartDetails = buyer.cart.map(item => ({
      productId: item.productId._id,
      name: item.productId.name,
      price: item.productId.price,
      photo: item.productId.photo,
      description: item.productId.description,
      quantity: item.quantity,
      farmerId: item.productId.farmerId
    }));
    return res.status(200).json({ cart: cartDetails });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
module.exports.updateCart = async (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Please login first' });
  }
  try {
    const { productId, quantity } = req.body; 
    if (!productId || !quantity) {
      return res.status(400).json({ message: 'ProductId and quantity are required' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const buyer = await BuyerModel.findById(decoded._id);
    if (!buyer) {
      return res.status(401).json({ message: 'Invalid token or user not found' });
    }
    const cartItem = buyer.cart.find(item => item.productId.toString() === productId);
    if (cartItem) {
      cartItem.quantity = quantity;
    } else {
      buyer.cart.push({ productId, quantity });
    }

    // Save the updated buyer's cart
    await buyer.save();
    return res.status(200).json({ message: 'Cart updated successfully', cart: buyer.cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
module.exports.deleteCart = async (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Please login first' });
  }
  try {
    const { productId } = req.body;
    // Expect productId in the request body
    if (!productId) {
      return res.status(400).json({ message: 'ProductId is required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const buyer = await BuyerModel.findById(decoded._id);

    if (!buyer) {
      return res.status(401).json({ message: 'Invalid token or user not found' });
    }

    // Find the item in the cart
    const cartItemIndex = buyer.cart.findIndex(item => item.productId.toString() === productId);

    if (cartItemIndex !== -1) {
      if (buyer.cart[cartItemIndex].quantity > 1) {
        // Reduce the quantity by one
        buyer.cart[cartItemIndex].quantity -= 1;
      } else {
        // Remove the item from the cart if the quantity is one
        buyer.cart.splice(cartItemIndex, 1);
      }
    } else {
      return res.status(400).json({ message: 'Product not found in cart' });
    }

    // Save the updated buyer's cart
    await buyer.save();
    return res.status(200).json({ message: 'Item updated in cart successfully', cart: buyer.cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
//products
module.exports.getProducts=async(req,res)=>{
  try{
    const products=await ProductModel.find();
    return res.status(200).json({products});
  }catch(error){
    console.error(error);
    return res.status(500).json({message:'Something went wrong'});
  }
}
module.exports.getProduct=async(req,res)=>{
  try{
    const {productId}=req.params;
    const product=await ProductModel.findById(productId);
    if(!product){
      return res.status(404).json({message:'Product not found'});
    }
   
    const farmer=await FarmerModel.findById(product.farmerId);
   
    return res.status(200).json({product:product,farmer:farmer});
  }catch(err){
    return res.status(500).json({message:err.message});
  }
}

module.exports.getCategory=async(req,res)=>{
  const {category}=req.params;
  try{
    const Categoryproducts=await ProductModel.find({category});
    // console.log(Categoryproducts)
    return res.status(200).json({Categoryproducts});
  }catch(error){
    return res.status(500).json({message:error.message});
  }
}
module.exports.SearchItem = async (req, res) => {
  const { query } = req.query;
  // console.log(req.query);

  try {
    // Validate query
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    // Split the query into terms by space (so user can search for multiple categories/keywords)
    const searchTerms = query.split(' ').map(term => term.trim());

    // Fetch all products from the database (consider limiting records for performance)
    const products = await ProductModel.find();

    // Prepare Fuse.js options for fuzzy search
    const fuseOptions = {
      keys: ['name', 'description', 'category'], // Fields to search in
      threshold: 0.3, // Adjust fuzziness (lower = more fuzzy)
      includeScore: true, // Optionally include score for relevance
    };

    // Initialize Fuse.js with the products and search options
    const fuse = new Fuse(products, fuseOptions);

    // Perform search for each term and collect the results
    let allResults = [];
    for (let term of searchTerms) {
      const searchResults = fuse.search(term); // Search each term
      // Extract the matched products from the search results
      const resultProducts = searchResults.map(result => result.item);
      allResults = [...new Set([...allResults, ...resultProducts])]; // Avoid duplicates by using Set
    }

    // Return the search results
    res.status(200).json(allResults);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports.getAllMessagesByRoomId = async (req, res) => {
  const { roomId } = req.params;
  try {
    const messages = await Message.find({ roomId }).sort({ timeStamp: 1 });
    return res.status(200).json({ messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports.getConversations = async (req, res) => {
  const { buyerId } = req.params;
  try {
    // Find all messages where the buyer is involved
    const messages = await Message.find({ senderId: buyerId }).distinct('receiverId');
    const farmers = await Farmer.find({ _id: { $in: messages } });
    return res.status(200).json({ farmers });
  } catch (error) {
    console.error('Error fetching conversations:', error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
module.exports.getFarmerByProductId = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await ProductModel.findById(productId);
    if (!product || !product.farmerId) {
      return res.status(404).json({ message: 'Product or farmer not found' });
    }
    const farmer = await Farmer.findById(product.farmerId);
    if (!farmer) {
      return res.status(404).json({ message: 'Farmer not found' });
    }
    return res.status(200).json({ farmer });
  } catch (error) {
    console.error('Error fetching farmer:', error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};


module.exports.deleteMessage=async(req,res)=>{
  const {messageId}=req.body;
  try{


    const message=await Message.findByIdAndDelete(messageId);
    if(!message){
      return res.status(404).json({message:'Message not found'});
    }
    return res.status(200).json({message:'Message deleted successfully'});
  }catch(err){
    console.log(err)
    return res.status(500).json({message:err.message});
  }
}
module.exports.ForgotPassword=async(req,res)=>{
  const { email } = req.body;

  // Validate email
  if (!email) {
      return res.status(400).json({ message: 'Email is required' });
  }
  const buyer=await BuyerModel.fineOne({email});
  if(!buyer){
      return res.status(404).json({message:'Invalid email'});
        }
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Convert to string

  try {
      const storeOtp = await OTPModel.updateOne(
          { email },
          {
              email,
              otp,
              expires: new Date(Date.now() + 600000) // Set expiration to 10 minutes from now
          },
          { upsert: true } // Create a new document if it doesn't exist
      );
      await sendOTPEmail(email, otp);
       // Await the email sending function

      return res.status(200).json({ message: 'OTP sent successfully' });
  } catch (err) {
      console.error('Error sending OTP:', err);
      return res.status(500).json({ message: 'Error sending OTP' });
  }
}
module.exports.VerifyOtp=async(req,res)=>{
  const {email,otp}=req.body;
  try{
      if(!email || !otp){
          return res.status(400).json({message:'Email and OTP are required'});
      }
      const checkOtp=await OTPModel.findOne({email,otp});
      if(!checkOtp){
          
          return res.status(400).json({message:'Invalid OTP'});
      }
      if (checkOtp.expires < Date.now()) {
          return res.status(400).json({ message: 'OTP expired' });
      }
      return res.status(200).json({message:'OTP verified successfully'});

  }catch(err){
      console.error('Error verifying OTP:',err);
      return res.status(500).json({message:'Error verifying OTP'});
  }
}
module.exports.addNewPassword=async(req,res)=>{
  const {email,newPassword}=req.body;
  // console.log(req.body)
  try{
    const exisitngBuyer=await BuyerModel.findOne({email});
    if(!exisitngBuyer){
      return res.status(404).json({message:'Buyer not found'});
    }
    await OTPModel.deleteOne({ email });
    const hashedPassword=await bcrypt.hash(newPassword,10);
    exisitngBuyer.password=hashedPassword;
    await exisitngBuyer.save();
    return res.status(200).json({message:'Password updated successfully'});
  }catch(err){

    console.error(err)
    return res.status(500).json({message:err.message});
  }
}