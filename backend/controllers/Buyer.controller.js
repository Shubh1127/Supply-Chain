const BuyerModel = require('../Model/BuyerSchema');
const ProductModel=require('../Model/ProductSchema')
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
    // console.log(buyer)
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
      path: 'cart.productId', // populate the productId field
      model: 'Product', // model to populate from (Product)
      select: 'name price photo description' // fields to select from the Product model
    });

    if (!buyer) {
      return res.status(401).json({ message: 'Invalid token or user not found' });
    }

    // Format the cart data with populated product details
    const cartDetails = buyer.cart.map(item => ({
      productId: item.productId._id,
      name: item.productId.name,
      price: item.productId.price,
      photo: item.productId.photo,
      description: item.productId.description,
      quantity: item.quantity
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
    return res.status(200).json({product});
  }catch(err){
    return res.status(500).json({message:err.message});
  }
}