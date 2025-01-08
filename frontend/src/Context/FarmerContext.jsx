import { createContext, useState, useContext,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FarmerContext = createContext();

export const useFarmer = () => {
  return useContext(FarmerContext);
};

export const FarmerProvider = ({ children }) => {
  const [farmer, setFarmer] = useState(null);
  const [user, setUser] = useState(localStorage.getItem('user') || '');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Save user to localStorage whenever it changes
    localStorage.setItem('user', user);
  }, [user]);

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
      if(response){
        setUser(user.name);
      }
      setMessage(response.data.message);
      navigate('/role/farmer/farmer-dashboard/');
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3000/farmer/login', { email, password });
      setFarmer(response.data.farmer);
      setMessage(response.data.message);
      navigate('/role/farmer/farmer-dashboard/');
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  const logout = () => {
    setFarmer(null);
    setUser('');
    navigate('/');
  };

  const getProfile = async () => {
    try {
      const response = await axios.get('http://localhost:3000/farmer/profile');
      setFarmer(response.data.farmer);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <FarmerContext.Provider value={{ farmer,user, signup, login, logout, getProfile, message }}>
      {children}
    </FarmerContext.Provider>
  );
};