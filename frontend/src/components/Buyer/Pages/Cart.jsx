import { useState, useEffect } from 'react';
import Header from '../components/BuyerHeader';
import { useBuyer } from '../../../Context/BuyerContext';

const Cart = () => {
  const { cart, getCart, updateCart, deleteCart } = useBuyer();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      await getCart();
      setCartItems(cart); // Set the cart data from context
    };

    if (cart.length === 0) {
      fetchCartItems();
    } else {
      setCartItems(cart); // Use cart data if already available
    }
  }, [cart, getCart]);

  // Handle Increase Quantity
  const handleIncrease = (index) => {
    const newQuantity = cartItems[index].quantity + 1;
    updateCart(index, newQuantity); // Update quantity in context and on the server
  };

  // Handle Delete Item from Cart
  const handleDelete = (productId) => {
    deleteCart(productId); // Remove item from cart
  };

  return (
    <>
      <Header />
      <div className="p-8 bg-gray-200 h-screen">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cartItems.map((item, index) => (
                <div key={index} className="border border-gray-300 p-4 rounded-lg flex flex-col items-center">
                  <img
                    src={item.photo}
                    alt={item.productName}
                    className="w-full h-60 mb-4 rounded object-cover object-center"
                  />
                  <p className="text-lg font-semibold mb-2">{item.productName}</p>
                  <p className="text-md font-semibold mb-2">Price: ₹{item.price}</p>
                  <div className="flex items-center space-x-2 mb-4">
                    <button
                      onClick={() => handleIncrease(index)}
                      className="bg-yellow-400 px-4 py-2 rounded-md text-white hover:bg-yellow-500 transition"
                    >
                      Increase Quantity
                    </button>
                    <p className="text-md">Quantity: {item.quantity}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(item.productId)}
                    className="bg-red-500 px-4 py-2 rounded-md text-white hover:bg-red-600 transition"
                  >
                    Remove from Cart
                  </button>
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
