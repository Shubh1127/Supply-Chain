const express=require('express');
const router=express.Router();
const farmerController=require('../controllers/Farmer.controller');
const upload=require('../middlewares/upload');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register', upload.single('profileImage'),farmerController.register);
router.post('/login',farmerController.login);
router.get('/logout',authMiddleware,farmerController.logout);
router.get('/profile',authMiddleware,farmerController.getProfile);
router.put('/updateprofile',authMiddleware,upload.single('profileImage'),farmerController.updateProfile);
//products routes
router.post('/addproduct',authMiddleware,upload.single('productImage'),farmerController.addProduct);
router.get('/products',authMiddleware,farmerController.getProducts);
//weather route
router.get('/weather',farmerController.Weather);
//buyer's Details
router.get('/buyers', farmerController.getAllBuyers);
//get Messages
router.get('/messages/:roomId',authMiddleware, farmerController.getMessagesByRoomId);
module.exports=router;