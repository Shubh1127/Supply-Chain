import { createContext, useState, useContext,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BuyerContext = createContext();

export const useBuyer = () => {
  return useContext(BuyerContext);
};

export const BuyerProvider = ({ children }) => {
  const [buyer, setBuyer] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedBuyer = localStorage.getItem('buyer');
    if (token) {
      axios.defaults.headers['Authorization'] = `Bearer ${token}`;
    }
    if (storedBuyer) {
      setBuyer(JSON.parse(storedBuyer)); 
    }
  }, []);

  useEffect(() => {
    if (buyer) {
      localStorage.setItem('buyer', JSON.stringify(buyer)); // Store buyer data as a string
    } else {
      localStorage.removeItem('buyer');
    }
  }, [buyer]);

  const signup = async (user) => {
    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('phoneNumber', user.phoneNumber);
    formData.append('profileImage', user.profileImage);
  
    try {
      const response = await axios.post('http://localhost:3000/buyer/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.data.token) {
        // Save token in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('buyer', JSON.stringify(response.data.buyer));
        setBuyer(response.data.buyer);
      }
  
      setMessage(response.data.message);
      navigate('/role/buyer/');
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3000/buyer/login', { email, password });
  
      if (response.data.token) {
        // Save token in localStorage
        localStorage.setItem('token', response.data.token);
  
        // Save buyer data in localStorage
        localStorage.setItem('buyer', JSON.stringify(response.data.buyer));
        axios.defaults.headers['Authorization'] = `Bearer ${response.data.token}`;
        setBuyer(response.data.buyer);
      }
  
      setMessage(response.data.message);
      navigate('/role/buyer/');
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };
  const logout = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/buyer/logout', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Remove user-related data from localStorage
      localStorage.removeItem('buyer'); // Remove buyer data
      localStorage.removeItem('token');  // Remove token
  
      // Clear the buyer state
      setBuyer(null);
  
      console.log(response.data.message); // Log the success message
      navigate('/'); // Navigate to the home page
    } catch (error) {
      console.error('Error logging out:', error.response ? error.response.data : error.message);
    }
  };

  const getProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/buyer/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBuyer(response.data.buyer);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };
  const updateProfile = async (user) => {
    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('phoneNumber', user.phoneNumber);
    if (user.profileImage) {
      formData.append('profileImage', user.profileImage);
    }

    try {
      const response = await axios.post('http://localhost:3000/buyer/updateProfile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setBuyer(response.data.buyer);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getProfile(); // Fetch the profile if token is available
    }
  }, []);

  return (
    <BuyerContext.Provider value={{ buyer, signup, login, logout, getProfile,updateProfile, message }}>
      {children}
    </BuyerContext.Provider>
  );
};