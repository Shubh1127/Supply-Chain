import Header from "../../Header";
import { useState } from "react";
import { motion } from 'framer-motion';
// import { useNavigate } from "react-router-dom";
import { useBuyer } from "../../../Context/BuyerContext";
import { Link } from "react-router-dom";

const SignupFarmer = () => {
  // const navigate = useNavigate();
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
    <Header/>
    <div style={styles.container} >
      <div style={styles.animatedBackground} className="flex flex-col text-white font-semibold ">
      <div className="absolute top-[28vh] text-4xl z-1 ">
        Grow Your Business With Us<br/>
       <p className="ms-[9vw] mt-9"> Get Started</p>
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
          style={styles.animatedShape}
          />
      </div>
      <div style={styles.formContainer}>
        <motion.form 
          onSubmit={handleSubmit} 
          style={styles.form}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          >
            {message && <p className="text-red-500 ms-[5rem]">{message}</p>}
          <h2 style={styles.title}>Join the Future</h2>
          <p style={styles.subtitle}>Sign up for an innovative experience</p>
          <motion.div 
            style={styles.inputGroup}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            >
           <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              placeholder="name"
              style={styles.input}
              required
              />
          </motion.div>
          <motion.div 
            style={styles.inputGroup}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            >
           <input
              type="Number"
              name="phoneNumber"
              value={user.phoneNumber}
              onChange={handleChange}
              placeholder="PhoneNumber"
              style={styles.input}
              required
              />
          </motion.div>
          <motion.div 
            style={styles.inputGroup}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            >
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Email"
              style={styles.input}
              required
              />
          </motion.div>

          <motion.div 
            style={styles.inputGroup}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            >
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Password"
              style={styles.input}
              required
              />
          </motion.div>
          
          
          <motion.div 
            style={styles.inputGroup}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            >
            <label htmlFor="profileImage" style={styles.label}>Profile Image</label>
            <input
              type="file"
              name="profileImage"
              onChange={handleChange}
              placeholder="Profile Image"
              accept="image/*"
              style={styles.input}
              // required
              />
          </motion.div>

          <motion.button
             type="submit"
             style={styles.button}
            whileHover={!loading && { scale: 1.1 }}
            whileTap={!loading && { scale: 0.9 }}
            disabled={loading}
            >
              {loading ? (
                    <div className="spinner" style={styles.spinner}></div>
                        ) : (
                          "Sign Up"
              )}
          </motion.button>

          <p style={styles.loginLink}>
            Already have an account? <Link to='/role/farmer/login' style={styles.link}>Log in</Link >
          </p>
        </motion.form>
      </div>
    </div>
</>
  );
};

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  animatedBackground: {
    flex: 1,
    backgroundColor: '#6C63FF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  spinner: {
    width: '20px',
    height: '20px',
    border: '3px solid #fff',
    borderTop: '3px solid transparent',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  '@keyframes spin': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
  animatedShape: {
    width: 100,
    height: 100,
    backgroundColor: '#4CAF50',
  },
  formContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontSize: '14px',
    color: '#333',
  },  
  form: {
    width: '80%',
    maxWidth: 400,
    padding: 40,
    backgroundColor: 'white',
    borderRadius: 10,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: 28,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: '10px 15px',
    fontSize: 16,
    border: '2px solid #ddd',
    borderRadius: 5,
    transition: 'border-color 0.3s',
    outline: 'none',
  },
  button: {
    width: '100%',
    padding: '12px',
    fontSize: 18,
    color: 'white',
    backgroundColor: '#6C63FF',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  loginLink: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
  },
  link: {
    color: '#6C63FF',
    textDecoration: 'none',
  },
};

export default SignupFarmer;