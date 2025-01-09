const express=require('express');
const router=express.Router();
const farmerController=require('../controllers/Farmer.controller');
const upload=require('../middlewares/upload');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register', upload.single('profileImage'),farmerController.register);
router.post('/login',farmerController.login);
router.get('/logout',authMiddleware,farmerController.logout);
router.get('/profile',authMiddleware,farmerController.getProfile);
module.exports=router;