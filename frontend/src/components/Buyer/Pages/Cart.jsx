import { useState, useEffect } from "react";
import Header from "../components/BuyerHeader";
import { useBuyer } from "../../../Context/BuyerContext";
import { Trash, Plus } from "lucide-react";
const Cart = () => {
  const { cart, getCart, updateCart, deleteCart,getProduct } = useBuyer();
  const [cartItems, setCartItems] = useState([]);
  console.log(cartItems);
  useEffect(() => {
    // console.log('req is  coming')
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

  const handleClick=async(productId_)=>{
    await getProduct(productId_);
  }
  
  const handleDelete = async (productId) => {
    await deleteCart(productId); 
    const updatedCartItems = cartItems.filter((item) => item.productId !== productId);
    setCartItems(updatedCartItems); // Update UI
    await getCart(); 
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
            <div className=" flex flex-col">
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="border border-gray-300 p-4  rounded-lg flex  items-center"
                >
                  <img
                    src={item.photo}
                    alt={item.productName}
                    onClick={()=>handleClick(item.productId)}
                    className="w-1/4 h-60 mb-4 rounded object-cover object-center"
                  />
                  <div className="flex flex-col  ml-4 gap-7" >
                    <div className="flex gap-8 justify-between items-center mb-2 w-full ">
                      <span className="flex hover:underline hover:decoration-blue-300 " onClick={()=>handleClick(item.productId)}>
                        <p className="text-lg font-semibold mb-2">
                          {item.name},
                        </p>
                        <p className="text-lg font-semibold mb-2 cursor-pointer " >
                          {item.description}
                        </p>
                      </span>
                      <p className="text-md font-semibold mb-2 flex ">
                        <div>₹</div>
                        <span className="text-2xl">{item.price}.00</span>
                      </p>
                    </div>
                    <div className="mb-3">
                      <p className="text-green-500">In Stock</p>
                      <p>Eligible for FREE Shipping</p>
                    </div>
                    <div className="flex items-center space-x-6 w-48 p-1 ps-2 mb-4 border border-gray-300 rounded-lg">
                      <button
                        onClick={() => handleDelete(item.productId)}
                        className="bg-red-500 px-4 py-2 rounded-md text-white hover:bg-red-600 transition"
                      >
                        <Trash size={24} />
                      </button>
                      <p className="text-md"> {item.quantity}</p>

                      <button
                        onClick={() => handleIncrease(item.productId)}
                        className="bg-yellow-400 px-4 py-2 rounded-md text-white hover:bg-yellow-500 transition"
                      >
                        <Plus />
                      </button>
                    </div>
                  </div>
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
