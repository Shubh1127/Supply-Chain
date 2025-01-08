const express=require('express');
const router=express.Router();
const farmerController=require('../controllers/Farmer.controller');
const upload=require('../middlewares/upload')

router.post('/register', upload.single('profileImage'),farmerController.register);
router.post('/login',farmerController.login);
module.exports=router;