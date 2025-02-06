import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [message, setMessage] = useState('');

  // 1. Send OTP to email
  const handleSendOtp = async () => {
    try {
      const { data } = await axios.post(
        'https://supply-chain-igtk.onrender.com/buyer/forgot', 
        { email }
      );
      if(data.message === 'OTP sent successfully') {
        console.log(data.message)
        setOtpSent(true);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error sending OTP.');
      console.log('Error sending OTP:', err);
    }
  };

  // 2. Verify OTP
  const handleVerifyOtp = async () => {
    try {
      const { data } = await axios.post(
        'https://supply-chain-igtk.onrender.com/buyer/verify', 
        { email, otp }
      );
      if(data.message === 'OTP verified successfully') {
        setMessage(data.message)
        setOtpVerified(true);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error verifying OTP.');
      console.log('Error verifying OTP:', err);
    }
  };

  // 3. Handle new password submission
  const handleNewPassword = async () => {
    try {
      const { data } = await axios.post(
        'https://supply-chain-igtk.onrender.com/buyer/addNewPassword', 
        { email, newPassword }
      );
      setMessage(data.message || 'Password reset successfully!');
      navigate('/role/buyer/login')
      console.log('Password reset successfully');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error resetting password.');
      console.log('Error resetting password:', err);
    }
  };

  return (
    <div className="max-w-md mx-auto border rounded p-4 bg-white shadow">
      <h2 className="text-xl font-bold mb-4">Forgot Password</h2>

      <label className="block mb-2 font-semibold">Email:</label>
      <input
        className="border p-2 w-full mb-4"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {!otpSent && (
        <button
          className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600"
          onClick={handleSendOtp}
        >
          Send OTP
        </button>
      )}

      {otpSent && !otpVerified && (
        <>
          <label className="block mt-4 mb-2 font-semibold">Enter OTP:</label>
          <input
            className="border p-2 w-full mb-4"
            type="text"
            placeholder="6-digit code"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button
            className="bg-green-500 text-white p-2 w-full rounded hover:bg-green-600"
            onClick={handleVerifyOtp}
          >
            Verify OTP
          </button>
        </>
      )}

      {otpVerified && (
        <>
          <label className="block mt-4 mb-2 font-semibold">New Password:</label>
          <input
            className="border p-2 w-full mb-4"
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button
            className="bg-green-500 text-white p-2 w-full rounded hover:bg-green-600"
            onClick={handleNewPassword}
          >
            Reset Password
          </button>
        </>
      )}

      {message && message=='OTP verified successfully' && <p className="text-green-500 text-center mt-4">{message}</p> ||
      <p className="text-red-500 text-center mt-4">{message}</p>}
    </div>
  );
};

export default ForgotPassword;