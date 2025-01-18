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
    const token = localStorage.getItem('Buyertoken');
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
        localStorage.setItem('Buyertoken', response.data.token);
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
      
      // console.log('API Response:', response.data);
  
      if (response.data.token) {
        localStorage.setItem('Buyertoken', response.data.token);
        localStorage.setItem('buyer', (response.data.buyer));
        axios.defaults.headers['Authorization'] = `Bearer ${response.data.token}`;
        setBuyer(response.data.buyer);
      }
  
      setMessage(response.data.message || 'Login successful!');
      navigate('/role/buyer/');
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message || 'An error occurred.');
      } else {
        setMessage('Unable to connect to the server. Please try again later.');
      }
  
      console.error('Login Error:', error);
    }
  };
  const logout = async () => {
    try {
      const token = localStorage.getItem('Buyertoken');
      const response = await axios.get('http://localhost:3000/buyer/logout', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem('buyer'); 
      localStorage.removeItem('Buyertoken');
      setBuyer(null);
      console.log(response.data.message);
      navigate('/role/buyer');
    } catch (error) {
      console.error('Error logging out:', error.response ? error.response.data : error.message);
    }
  };

  const getProfile = async () => {
    try {
      const token = localStorage.getItem('Buyertoken');
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
      const token=localStorage.getItem('Buyertoken');
      const response = await axios.put('http://localhost:3000/buyer/updateprofile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });
      setBuyer(response.data.buyer);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  //address
  const addAddress = async (address) => {
    try {
      const response = await axios.post('http://localhost:3000/buyer/addAddress', address, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('Buyertoken')}`,
        },
      });
      setBuyer(response.data.buyer);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  const updateAddress = async (index, address) => {
    try {
      const response = await axios.put(`http://localhost:3000/buyer/address/${index}`, address, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('Buyertoken')}`,
        },
      });
      setBuyer(response.data.buyer);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  const deleteAddress = async (index) => {
    try {
      const response = await axios.delete(`http://localhost:3000/buyer/address/${index}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('Buyertoken')}`,
        },
      });
      setBuyer(response.data.buyer);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  const setDefaultAddress = async (index) => {
    console.log('request is coming');
    try {
      const response = await axios.put(`http://localhost:3000/buyer/address/default/${index}`, {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('Buyertoken')}`,
        },
      });
      setBuyer(response.data.buyer);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('Buyertoken');
    if (token) {
      getProfile(); // Fetch the profile if token is available
    }
  }, []);

  return (
    <BuyerContext.Provider value={{ buyer, signup, login, logout, getProfile,updateProfile,addAddress,updateAddress,deleteAddress,setDefaultAddress, message }}>
      {children}
    </BuyerContext.Provider>
  );
};