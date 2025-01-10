const express=require('express');
const router=express.Router();
const BuyerController=require('../controllers/Buyer.controller');
const authMiddleware=require('../middlewares/auth.middleware');
const upload=require('../middlewares/upload');

router.post('/register',upload.single('profileImage'),BuyerController.register);
router.post('/login',BuyerController.login);
router.get('/logout',authMiddleware,BuyerController.logout);
router.get('/profile',authMiddleware,BuyerController.getProfile);
router.put('/update',authMiddleware,upload.single('profileImage'),BuyerController.updateProfile);

module.exports=router;