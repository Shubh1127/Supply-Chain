import Header from "../../Header";
import { useState } from "react";
import { motion } from 'framer-motion';
import { useBuyer } from "../../../Context/BuyerContext";
import { Link } from "react-router-dom";

const BuyerLogin = () => {
  const { login, message } = useBuyer();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await login(user);
    setLoading(false);
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-4 flex flex-col lg:flex-row">
        <div className="hidden lg:flex lg:w-1/2 p-4 flex-col text-white font-semibold items-center justify-center bg-[#6C63FF]">
          <div className="text-4xl mb-4">
            Welcome Back!
            <p className="mt-9">Log in to continue</p>
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
            <h2 className="text-2xl font-bold mb-4 text-center">Log In</h2>
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
            <motion.button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md"
              whileHover={!loading && { scale: 1.1 }}
              whileTap={!loading && { scale: 0.9 }}
              disabled={loading}
            >
              {loading ? (
                <div className="spinner w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
              ) : (
                "Log In"
              )}
            </motion.button>
            <p className="mt-4 text-center text-gray-600">
              Don&apos;t have an account? <Link to='/role/buyer/signup' className="text-blue-500">Sign Up</Link>
            </p>
          </motion.form>
        </div>
      </div>
    </>
  );
};

export default BuyerLogin;