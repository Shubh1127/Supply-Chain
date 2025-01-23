import { useBuyer } from "../../../Context/BuyerContext";
import Header from "../components/BuyerHeader";
import { useEffect } from "react";
const Category = () => {
  const { categoryProducts, addToCart, getProduct, getProducts } = useBuyer();
  const handleClick = (productId) => {
    getProduct(productId);
  };
  useEffect(() => {
    getProducts();
  }, []);
  const handleAddToCart = (productId) => {
    addToCart(productId);
  };
  return (
    <>
      <Header />
      <div className="flex p-4">
        {categoryProducts.map((product, index) => (
          <div
            key={index}
            className="border rounded-lg p-4   cursor-pointer"
            onClick={() => handleClick(product._id)}
          >
            <div className="flex flex-col">
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
          </div>
        ))}
      </div>
    </>
  );
};

export default Category;
