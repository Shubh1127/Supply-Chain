import React, { useState } from 'react'
import { CiCircleRemove } from "react-icons/ci";
const Hero = () => {
    const products = [
        { id: 1, name: 'Fresh Apples', price: 2.5, quantity: 10 },
        { id: 2, name: 'Organic Carrots', price: 1.8, quantity: 8 },
        { id: 3, name: 'Tomatoes', price: 3.0, quantity: 15 },
        { id: 4, name: 'Lettuce', price: 1.2, quantity: 12 },
      ];
    
      // State to track cart
      const [cart, setCart] = useState([]);
      const [total, setTotal] = useState(0);
      const addToCart = (product) => {
        setTotal(total + product.price);
        setCart((prevCart) => [...prevCart, product]);
      };
     const remove = (item) => {
        setCart((items) => items.filter((i) => i !== item));
        setTotal(total - item.price);
      } 
      console.log(total);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Farmer's Market</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
            <p className="text-gray-600 mt-2">Price: ${product.price}</p>
            <p className="text-gray-600 mt-1">Available: {product.quantity} items</p>
            
            <button
              onClick={() => addToCart(product)}
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 focus:outline-none"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
        <ul className="mt-4">
          {cart.map((item, index) => (
            <li key={index} className="flex justify-between items-center py-2 px-4 bg-gray-100 rounded-lg mb-2">
              <span>{item.name}</span>
              <span className="text-gray-600">${item.price}</span>
              <CiCircleRemove onClick={() => remove(item)}/>
            </li>
          ))}
        </ul>
        {cart.length > 0 && (
          <div className="mt-4 text-right">
            <button className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600">
              Proceed to Checkout : ${total}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Hero