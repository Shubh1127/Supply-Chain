import Header from "../components/BuyerHeader";
import { useEffect } from "react";
import { useBuyer } from "../../../Context/BuyerContext";

const Category = () => {
  const { categoryProducts, addToCart, getProduct, getProducts } = useBuyer();

  const handleClick = (productId) => {
    getProduct(productId);
  };

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const handleAddToCart = (productId) => {
    addToCart(productId);
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categoryProducts.map((product, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 cursor-pointer"
              onClick={() => handleClick(product._id)}
            >
              <div className="flex flex-col">
                <img
                  src={product.photo}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-2">₹{product.price}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product._id);
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Category;