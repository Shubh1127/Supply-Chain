import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FarmerContext = createContext();

export const useFarmer = () => {
  return useContext(FarmerContext);
};

export const FarmerProvider = ({ children }) => {
  const [farmer, setFarmer] = useState(null);
  const [weather, setWeather] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedTime = localStorage.getItem('tokenTime');
    const storedFarmer = localStorage.getItem('farmer');

    if (token && storedTime) {
      const currentTime = new Date().getTime();
      const elapsedTime = currentTime - storedTime;

      // Check if the token is older than 24 hours
      if (elapsedTime > 24 * 60 * 60 * 1000) {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenTime');
        localStorage.removeItem('farmer');
        setFarmer(null);
      } else {
        axios.defaults.headers['Authorization'] = `Bearer ${token}`;
        if (storedFarmer) {
          setFarmer(JSON.parse(storedFarmer));
        }
      }
    }
  }, []);

  useEffect(() => {
    if (farmer) {
      localStorage.setItem('farmer', JSON.stringify(farmer));
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
        const currentTime = new Date().getTime();
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('tokenTime', currentTime);
        localStorage.setItem('farmer', JSON.stringify(response.data.farmer));
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
        const currentTime = new Date().getTime();
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('tokenTime', currentTime);
        localStorage.setItem('farmer', JSON.stringify(response.data.farmer));
        axios.defaults.headers['Authorization'] = `Bearer ${response.data.token}`;
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

      localStorage.removeItem('farmer');
      localStorage.removeItem('token');
      localStorage.removeItem('tokenTime');
      setFarmer(null);

      console.log(response.data.message);
      navigate('/');
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
    formData.append('phone', user.phoneNumber);
    formData.append('address[houseNo]', user.address.houseNo);
    formData.append('address[street]', user.address.street);
    formData.append('address[city]', user.address.city);
    formData.append('address[state]', user.address.state);
    formData.append('address[pincode]', user.address.pincode);

    if (user.profileImage) {
      formData.append('profileImage', user.profileImage);
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:3000/farmer/updateprofile', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error.response?.data?.message || error.message);
    }
  };

  const addProduct = async (product) => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('quantity', product.quantity);
    formData.append('productImage', product.productImage);

    try {
      const response = await axios.post('http://localhost:3000/farmer/addproduct', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log(response);
    } catch (error) {
      console.error('Error:', error.response?.data?.message || error.message);
    }
  };

  const getWeather = async (lat, lon) => {
    try {
      const response = await axios.get(`http://localhost:3000/farmer/weather?lat=${lat}&lon=${lon}`);
      setWeather(response.data);
    } catch (error) {
      console.error('Error:', error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getProfile();
    }
  }, []);

  return (
    <FarmerContext.Provider value={{ farmer, signup, login, logout, getProfile, updateProfile, addProduct, getWeather, weather, message }}>
      {children}
    </FarmerContext.Provider>
  );
};
