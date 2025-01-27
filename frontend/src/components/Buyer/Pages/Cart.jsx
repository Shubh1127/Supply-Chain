import { useState, useEffect } from "react";
import Header from "../components/BuyerHeader";
import { useBuyer } from "../../../Context/BuyerContext";
import { Trash, Plus } from "lucide-react";

const Cart = () => {
  const { cart, getCart, updateCart, deleteCart, getProduct } = useBuyer();
  const [cartItems, setCartItems] = useState([]);
  // console.log(cartItems);

  useEffect(() => {
    const fetchCartItems = async () => {
      await getCart();
    };
    if (cart.length === 0) {
      fetchCartItems();
    } else {
      setCartItems(cart);
    }
  }, [cart.length, getCart]);

  const handleIncrease = async (productId) => {
    const updatedCartItems = [...cartItems]; // Clone the cartItems
    const itemIndex = updatedCartItems.findIndex((item) => item.productId === productId);
    if (itemIndex !== -1) {
      const newQuantity = updatedCartItems[itemIndex].quantity + 1;
      await updateCart(productId, newQuantity);
      updatedCartItems[itemIndex].quantity = newQuantity;
      setCartItems(updatedCartItems);
      await getCart();
    }
  };

  const handleClick = async (productId_) => {
    await getProduct(productId_);
  };

  const handleDelete = async (productId) => {
    await deleteCart(productId);
    setCartItems(cartItems.filter(item => item.productId !== productId));
    await getCart();
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-2/3 border p-2 rounded-md">
              {cartItems.map((item) => (
                <div key={item.productId} className="flex flex-col lg:flex-row items-center justify-between border-b py-4" >
                  <img src={item.photo} alt={item.name} onClick={() => handleClick(item.productId)} className="cursor-pointer w-24 h-24 object-cover rounded-md mb-4 lg:mb-0" />
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between w-full lg:w-2/3">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between w-full">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between w-full">
                        <h2 className="text-lg font-semibold cursor-pointer" onClick={() => handleClick(item.productId)}>{item.name}</h2>
                        <p className="text-gray-600">₹{item.price}</p>
                      </div>
                      <div className="flex items-center mt-2 lg:mt-0">
                        <button
                          onClick={() => handleIncrease(item.productId)}
                          className="px-2 py-1 ms-2 bg-gray-200 rounded-md"
                        >
                          <Plus/>
                        </button>
                        <span className="px-4">{item.quantity}</span>
                        <button
                          onClick={() => handleDelete(item.productId)}
                          className="px-2 py-1 bg-gray-200 rounded-md"
                        >
                         <Trash/>
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(item.productId)}
                      className="mt-2 lg:mt-0 lg:ml-4 px-4 py-2 bg-red-500 text-white rounded-md"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:w-1/3 lg:pl-4 mt-4 lg:mt-0">
              <div className="border p-4 rounded-md">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>₹{cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Tax</span>
                  <span>₹{(cartItems.reduce((total, item) => total + item.price * item.quantity, 0) * 0.1).toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span>Total</span>
                  <span>₹{(cartItems.reduce((total, item) => total + item.price * item.quantity, 0) * 1.1).toFixed(2)}</span>
                </div>
                <button className="w-full bg-blue-500 text-white py-2 rounded-md">Proceed to Checkout</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;