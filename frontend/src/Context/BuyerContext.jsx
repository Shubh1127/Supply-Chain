import { createContext, useState, useContext,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BuyerContext = createContext();

export const useBuyer = () => {
  return useContext(BuyerContext);
};

export const BuyerProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [item,setItem]=useState([]);
  const [buyer, setBuyer] = useState(null);
  const [farmers, setFarmers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [products,setProducts]=useState([]);
  const [productfarmer,setProductFarmer]=useState([]);
  const [chatFarmer, setChatFarmer] = useState(null)
  const  [searchProducts,setSearchProducts]=useState([]);
  const [categoryProducts,setCategoryProducts]=useState([]);
 
  const navigate = useNavigate();

  useEffect(()=>{
    const token=localStorage.getItem('buyerToken');
    const storedTime=localStorage.getItem('buyerTokenTime');
    const storedBuyer=localStorage.getItem('buyer');

    if(token && storedTime){
      const currentTime=new Date().getTime();
      const elapsedTime=currentTime-storedTime;
    
        if(elapsedTime>24*60*60*1000){
          localStorage.removeItem('buyertoken');
          localStorage.removeItem('buyerTokenTime');
          localStorage.removeItem('buyer');
          setBuyer(null);
        }else{
          axios.defaults.headers['Authorization'] = `Bearer ${token}`;
          if(storedBuyer){
            setBuyer(JSON.parse(storedBuyer));
          }
        }
    }
    
  },[])

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
      const response = await axios.post('https://supply-chain-igtk.onrender.com/buyer/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.data.token) {
        const currentTime=new Date().getTime();
        localStorage.setItem('Buyertoken', response.data.token);
        localStorage.setItem('buyerTokenTime', currentTime);
        localStorage.setItem('buyer', JSON.stringify(response.data.buyer));
        setBuyer(response.data.buyer);
      }
  
      setMessage(response.data.message);
      navigate('/role/buyer/');
    } catch (error) {
      setMessage(error.response.data.message);
    }
    
  };

  const login = async ({email, password}) => {
    try {
      const response = await axios.post('https://supply-chain-igtk.onrender.com/buyer/login', { email, password });
      
      // console.log('API Response:', response.data);
  
      if (response.data.token) {
        const currentTime=new Date().getTime();
        localStorage.setItem('BuyerTokenTime',currentTime);
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
      }     
    }
}
  const logout = async () => {
    try {
      const token = localStorage.getItem('Buyertoken');
      const response = await axios.get('https://supply-chain-igtk.onrender.com/buyer/logout', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem('buyer'); 
      localStorage.removeItem('Buyertoken');
      setBuyer(null);
      // console.log(response.data.message);
      navigate('/role/buyer');
    } catch (error) {
      console.error('Error logging out:', error.response ? error.response.data : error.message);
    }
    
  };

  const getProfile = async () => {
    try {
      const token = localStorage.getItem('Buyertoken');
      const response = await axios.get('https://supply-chain-igtk.onrender.com/buyer/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(response.data.buyer);
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
      const response = await axios.put('https://supply-chain-igtk.onrender.com/buyer/updateprofile', formData, {
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
      const response = await axios.post('https://supply-chain-igtk.onrender.com/buyer/addAddress', address, {
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
      const response = await axios.put(`https://supply-chain-igtk.onrender.com/buyer/address/${index}`, address, {
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
      const response = await axios.delete(`https://supply-chain-igtk.onrender.com/buyer/address/${index}`, {
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
    try {
      const response = await axios.put(`https://supply-chain-igtk.onrender.com/buyer/address/default/${index}`, {}, {
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

  //orders and cart
  const addToCart = async (productId) => {
    const token=localStorage.getItem('Buyertoken');
    try {
      const response = await axios.post('https://supply-chain-igtk.onrender.com/buyer/addToCart', {productId},{
        headers:{
          'Authorization': `Bearer ${token}`,
        },
       });
      setCart(response.data.cart); // Update cart state after adding product
      setMessage('Product added to cart');
    } catch (error) {
      setMessage(error.response.data.message || 'Error adding product to cart');
    }
  };

  // Update Cart function
  const updateCart = async (productId, quantity) => {
    const token=localStorage.getItem('Buyertoken');
    try {
      const response = await axios.put(`https://supply-chain-igtk.onrender.com/buyer/updatecart`,{productId,quantity},{
        headers:{
          'Authorization': `Bearer ${token}`,
        },
       
      });
      setCart(response.data.cart); // Update cart state after updating quantity
      setMessage('Cart updated successfully');
    } catch (error) {
      setMessage(error.response.data.message || 'Error updating cart');
    }
  };

  // Delete Cart function
  const deleteCart = async (productId) => {
    const token=localStorage.getItem('Buyertoken');
    try {
      const response = await axios.delete(`https://supply-chain-igtk.onrender.com/buyer/cart`,{
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        data: { productId :productId}
      });
      setCart(response.data.cart); // Update cart state after deleting item
      setMessage('Product removed from cart');
    } catch (error) {
      setMessage(error.response.data.message || 'Error removing product from cart');
    }
  };

  // Fetch the cart items
  const getCart = async () => {
    const token=localStorage.getItem('Buyertoken');

    try {
      const response = await axios.get('https://supply-chain-igtk.onrender.com/buyer/cart',{
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setCart(response.data.cart);
      // setCartFarmer(response.data.farmer);
    } catch (error) {
      setMessage(error.response.data.message || 'Error fetching cart');
    }
  };

  //getProducts
  const getProducts=async()=>{
    try{
      const response=await axios.get('https://supply-chain-igtk.onrender.com/buyer/products');
      setProducts(response.data.products); 

      // console.log(response)
    }catch(error){
      setMessage(error.response.data.message || 'Error fetching products');
  }
  }

  const getProduct=async(productId)=>{
    try{
      const response=await axios.get(`https://supply-chain-igtk.onrender.com/buyer/product/${productId}`);
      setItem(response.data.product);
      // console.log(response.data)
      localStorage.setItem('product',JSON.stringify(response.data.product));
      setProductFarmer(response.data.farmer);
      navigate(`/role/buyer/buy/${productId}`);
    }catch(error){
      setMessage(error.response.data.message || 'Error fetching product');
    }
  }
  const Getcategory=async(category)=>{
    try{
      const response=await axios.get(`https://supply-chain-igtk.onrender.com/buyer/category/${category}`);
      setCategoryProducts(response.data.Categoryproducts);
      navigate(`/role/buyer/products/${category}`);
    }catch(error){
      setMessage(error.response.data.message || 'Error fetching category');
    }
  }

  const searchItem=async(searchQuery)=>{
    console.log(searchQuery);
    try{
      const response = await axios.get(`https://supply-chain-igtk.onrender.com/buyer/search?query=${searchQuery}`);
      // console.log(response.data)
      setSearchProducts(response.data);
      navigate(`/role/buyer/search/${searchQuery}`);
      }catch(error){
        setMessage(error.response.data.message || 'Error fetching search');
      }
    }

    const getMessagesByRoomId = async (roomId) => {
      try {
        const response = await axios.get(`https://supply-chain-igtk.onrender.com/buyer/messages/${roomId}`,{
          
      });
        setMessages(response.data.messages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    const getConversations = async (buyerId) => {
      const token=localStorage.getItem('Buyertoken');
      try {
        const response = await axios.get(`https://supply-chain-igtk.onrender.com/buyer/conversations/${buyerId}`,{
          headers:{
            'Authorization':`Bearer ${token}`,
          }
        });
        setFarmers(response.data.farmers);
      } catch (error) {
        console.error('Error fetching conversations:', error);
      }
    };
    const getFarmerByProductId = async (productId) => {
      try {
        const response = await axios.get(`https://supply-chain-igtk.onrender.com/buyer/farmer/${productId}`);
        setChatFarmer(response.data.farmer);
      } catch (error) {
        console.error('Error fetching farmer:', error);
      }
    };


    const deleteMessage=async(messageId)=>{
      const token=localStorage.getItem('Buyertoken');
      try{
        const response=await axios.delete('https://supply-chain-igtk.onrender.com/buyer/deleteConvo',{
          'headers':{
            'Authorization':`Bearer ${token}`
          },
          'data':{messageId}
        })
        setMessage(response.data.message);
      }catch(error){
        console.error('Error deleting message:', error);
      }
    }
    const sendOTP = async (email) => {
      try {
        const response = await axios.post(
          'https://supply-chain-igtk.onrender.com/buyer/forgot-password',
          { email }
        );
        setMessage(response.data.message || 'OTP sent successfully.');
      } catch (error) {
        setMessage(error.response?.data?.message || 'Failed to send OTP.');
      }
    };
    const verifyOTP = async (email, otp) => {
      try {
        const response = await axios.post(
          'https://supply-chain-igtk.onrender.com/buyer/verify-otp',
          { email, otp }
        );
        setMessage(response.data.message);
  
        if (response.data.success) {
          // OTP is correct; you could now prompt for a new password or redirect.
        }
      } catch (error) {
        setMessage(error.response?.data?.message || 'Failed to verify OTP.');
      }
    };

  useEffect(() => {
    const token = localStorage.getItem('Buyertoken');
    if (token) {
      getProfile(); // Fetch the profile if token is available
    }
  }, []);

  return (
    <BuyerContext.Provider value={{ buyer, signup, login, logout, getProfile,updateProfile,addAddress,updateAddress,deleteAddress,setDefaultAddress, message,
      addToCart, updateCart, deleteCart, getCart,cart,products,getProducts,getProduct,item,setItem,setMessage,Getcategory,categoryProducts,
      productfarmer,setProductFarmer,searchItem,searchProducts, messages, getMessagesByRoomId,
      farmers, getConversations, getFarmerByProductId,chatFarmer,deleteMessage,sendOTP,verifyOTP,


     }}>
      {children}
    </BuyerContext.Provider>
  );
};
