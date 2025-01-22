import { useBuyer } from "../../../Context/BuyerContext"; // Import the useBuyer hook to access cart functions
import { useEffect } from "react";
export default function FeaturedProducts() {
  const { getProducts,products,item,getProduct } = useBuyer();
  const { addToCart } = useBuyer(); // Destructure addToCart from BuyerContext

  useEffect(()=>{
    getProducts();
    // console.log(products[0])
  },[])
  const handleAddToCart = (productId) => {
    addToCart(productId); // Call addToCart with the productId when the button is clicked
  };
  const handleClick=(productId)=>{
    getProduct(productId)
  }

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div key={index} className="border rounded-lg p-4 flex flex-col cursor-pointer" onClick={()=>handleClick(product._id)}>
              <img
                src={product.photo}
                alt={product.name}
                width={300}
                height={300}
                className="w-full h-60 mb-4 rounded object-cover"
              />
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-xl font-bold mb-4">&#x20b9;{product.price}</p>
              <button
                onClick={() => handleAddToCart(product._id)} 
                className="mt-auto bg-yellow-400 rounded-md p-1"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
