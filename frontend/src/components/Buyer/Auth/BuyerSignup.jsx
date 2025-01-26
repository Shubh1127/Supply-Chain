import Header from "../../Header";
import { useState } from "react";
import { motion } from 'framer-motion';
import { useBuyer } from "../../../Context/BuyerContext";
import { Link } from "react-router-dom";

const SignupBuyer = () => {
  const { signup, message } = useBuyer();
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    profileImage: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profileImage') {
      setUser({ ...user, profileImage: files[0] });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await signup(user);
    setLoading(false);
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-4 flex flex-col lg:flex-row">
        <div className="hidden lg:flex lg:w-1/2 p-4 flex-col text-white font-semibold items-center justify-center bg-[#6C63FF]">
          <div className="text-4xl mb-4">
            Grow Your Business With Us
            <p className="mt-9">Get Started</p>
          </div>
          <motion.div
            animate={{
              scale: [1, 2, 2, 1, 1],
              rotate: [0, 0, 270, 270, 0],
              borderRadius: ["20%", "20%", "50%", "50%", "20%"],
            }}
            transition={{
              duration: 10,
              ease: "easeInOut",
              times: [0, 0.2, 0.5, 0.8, 1],
              repeat: Infinity,
              repeatDelay: 1
            }}
            className="w-24 h-24 bg-green-500"
          />
        </div>
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-[#F0F0F0]">
          <motion.form 
            onSubmit={handleSubmit} 
            className="w-4/5 max-w-md p-6 bg-white rounded-lg shadow-md"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {message && <p className="text-red-500">{message}</p>}
            <h2 className="text-2xl font-bold mb-4 text-center">Join the Future</h2>
            <p className="text-center text-gray-600 mb-4">Sign up for an innovative experience</p>
            <motion.div 
              className="mb-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full p-2 border rounded-md"
                required
              />
            </motion.div>
            <motion.div 
              className="mb-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <input
                type="number"
                name="phoneNumber"
                value={user.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full p-2 border rounded-md"
                required
              />
            </motion.div>
            <motion.div 
              className="mb-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-2 border rounded-md"
                required
              />
            </motion.div>
            <motion.div 
              className="mb-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full p-2 border rounded-md"
                required
              />
            </motion.div>
            <motion.div 
              className="mb-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <label htmlFor="profileImage" className="block mb-2 text-gray-700">Profile Image</label>
              <input
                type="file"
                name="profileImage"
                onChange={handleChange}
                placeholder="Profile Image"
                accept="image/*"
                className="w-full p-2 border rounded-md"
              />
            </motion.div>
            <motion.button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md"
              whileHover={!loading && { scale: 1.1 }}
              whileTap={!loading && { scale: 0.9 }}
              disabled={loading}
            >
              {loading ? (
                <div className="spinner w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Sign Up"
              )}
            </motion.button>
            <p className="mt-4 text-center text-gray-600">
              Already have an account? <Link to='/role/buyer/login' className="text-blue-500">Log in</Link>
            </p>
          </motion.form>
        </div>
      </div>
    </>
  );
};

export default SignupBuyer;