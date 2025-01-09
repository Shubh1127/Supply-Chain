import { createContext, useState, useContext,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FarmerContext = createContext();

export const useFarmer = () => {
  return useContext(FarmerContext);
};

export const FarmerProvider = ({ children }) => {
  const [farmer, setFarmer] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve token and farmer info from localStorage when page loads
    const token = localStorage.getItem('token');
    const storedFarmer = localStorage.getItem('farmer');
    if (token) {
      // Set token in axios headers for subsequent requests
      axios.defaults.headers['Authorization'] = `Bearer ${token}`;
    }
    if (storedFarmer) {
      setFarmer(JSON.parse(storedFarmer)); // Parse and set stored farmer data
    }
  }, []);

  useEffect(() => {
    if (farmer) {
      localStorage.setItem('farmer', JSON.stringify(farmer)); // Store farmer data as a string
    } else {
      localStorage.removeItem('farmer');
    }
  }, [farmer]);

  const signup = async (user) => {
    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('phoneNumber', user.phoneNumber);
    formData.append('profileImage', user.profileImage);
  
    try {
      const response = await axios.post('http://localhost:3000/farmer/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.data.token) {
        // Save token in localStorage
        localStorage.setItem('token', response.data.token);
  
        // Save farmer data in localStorage
        localStorage.setItem('farmer', JSON.stringify(response.data.farmer));
  
        // Update state with the farmer data
        setFarmer(response.data.farmer);
      }
  
      setMessage(response.data.message);
      navigate('/role/farmer/');
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3000/farmer/login', { email, password });
  
      if (response.data.token) {
        // Save token in localStorage
        localStorage.setItem('token', response.data.token);
  
        // Save farmer data in localStorage
        localStorage.setItem('farmer', JSON.stringify(response.data.farmer));
  
        // Set token in axios headers for subsequent requests
        axios.defaults.headers['Authorization'] = `Bearer ${response.data.token}`;
  
        // Update state with the farmer data
        setFarmer(response.data.farmer);
      }
  
      setMessage(response.data.message);
      navigate('/role/farmer/');
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };
  const logout = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/farmer/logout', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Remove user-related data from localStorage
      localStorage.removeItem('farmer'); // Remove farmer data
      localStorage.removeItem('token');  // Remove token
  
      // Clear the farmer state
      setFarmer(null);
  
      console.log(response.data.message); // Log the success message
      navigate('/'); // Navigate to the home page
    } catch (error) {
      console.error('Error logging out:', error.response ? error.response.data : error.message);
    }
  };

  const getProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/farmer/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFarmer(response.data.farmer);
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
      const response = await axios.post('http://localhost:3000/farmer/updateProfile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setFarmer(response.data.farmer);
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
    <FarmerContext.Provider value={{ farmer, signup, login, logout, getProfile,updateProfile, message }}>
      {children}
    </FarmerContext.Provider>
  );
};