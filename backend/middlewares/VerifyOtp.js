const OTPModel = require("../Model/OtpSchema");

module.exports=async function VerifyOtp(req, res, next) {
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

        next();
    }catch(err){
        console.error('Error verifying OTP:',err);
        return res.status(500).json({message:'Error verifying OTP'});
    }
}