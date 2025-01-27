const express=require('express');
const router=express.Router();
const BuyerController=require('../controllers/Buyer.controller');
const authMiddleware=require('../middlewares/auth.middleware');
const upload=require('../middlewares/upload');

router.post('/register',upload.single('profileImage'),BuyerController.register);
router.post('/login',BuyerController.login);
router.get('/logout',authMiddleware,BuyerController.logout);
router.get('/profile',authMiddleware,BuyerController.getProfile);
router.put('/updateprofile',authMiddleware,upload.single('profileImage'),BuyerController.updateProfile);

//address
router.post('/addAddress',authMiddleware,BuyerController.addAddress);
router.put('/address/:index',authMiddleware,BuyerController.updateAddress);
router.delete('/address/:index',authMiddleware,BuyerController.deleteAddress);
router.put('/address/default/:index', authMiddleware, BuyerController.setDefaultAddress);

//orders and cart
router.post('/addToCart',authMiddleware,BuyerController.addToCart);
router.get('/cart',authMiddleware,BuyerController.getCart);
router.put('/updatecart',authMiddleware,BuyerController.updateCart);
router.delete('/cart',authMiddleware,BuyerController.deleteCart);
// router.post('/placeOrder',authMiddleware,BuyerController.placeOrder);
router.get('/category/:category',BuyerController.getCategory);
router.get('/product/:productId',BuyerController.getProduct);
router.get('/search',BuyerController.SearchItem);

//products
router.get('/products',BuyerController.getProducts);

//allMessages
router.get('/messages/:roomId',authMiddleware, BuyerController.getAllMessagesByRoomId);
router.get('/conversations/:buyerId', BuyerController.getConversations);
router.get('/farmer/:productId', BuyerController.getFarmerByProductId);
router.delete('/deleteConvo',authMiddleware,BuyerController.deleteMessage)

module.exports=router;
