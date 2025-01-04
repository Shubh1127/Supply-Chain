const express=require('express');
const router=express.Router();
const farmerController=require('../controllers/Farmer.controller');

router.post('/register',farmerController.register);
module.exports=router;