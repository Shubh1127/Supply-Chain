import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/BuyerHeader';
// import { useBuyer } from '../../../Context/BuyerContext';

const Cart = () => {
//   const { buyer } = useBuyer();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:3000/cart', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('Buyertoken')}`,
          },
        });
        setCartItems(response.data.cartItems);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  return (
    <>
      <Header />
      <div className="p-8 bg-gray-200 h-screen">
        <div className='bg-white'>
        <h2 className="text-2xl font-bold mb-4 ">Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your Supply Chain Cart is empty.</p>
        ) 
        
        : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cartItems.map((item) => (
              <div key={item.id} className="border border-gray-300 p-4 rounded">
                <p>Product Name: {item.productName}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.price}</p>
                {/* Add more item details as needed */}
              </div>
            ))}
          </div>
        )}
        </div>
      </div>
    </>
  );
};

export default Cart;