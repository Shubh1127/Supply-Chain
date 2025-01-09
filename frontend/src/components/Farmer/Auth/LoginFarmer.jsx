import Header from "../../Header";
import { useState } from "react";
import { motion } from 'framer-motion';
import { useFarmer } from '../../../Context/FarmerContext';
import { Link } from "react-router-dom";

const LoginFarmer = () => {
  const { login, message } = useFarmer();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await login(credentials.email, credentials.password);
    setLoading(false);
  };

  return (
    <>
      <Header />
      <div style={styles.container}>
        <div style={styles.animatedBackground} className="flex flex-col text-white font-semibold ">
          <div className="absolute top-[28vh] text-4xl z-1 ">
            Welcome Back<br />
            <p className="ms-[5vw] mt-8"> Log In</p>
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
            <h2 style={styles.title}>Welcome Back</h2>
            <p style={styles.subtitle}>Log in to continue</p>
            <motion.div
              style={styles.inputGroup}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <input
                type="email"
                name="email"
                value={credentials.email}
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
                value={credentials.password}
                onChange={handleChange}
                placeholder="Password"
                style={styles.input}
                required
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
                "Log In"
              )}
            </motion.button>

            <p style={styles.loginLink}>
              Don't have an account? <Link to='/role/farmer/signup' style={styles.link}>Sign Up</Link>
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

export default LoginFarmer;