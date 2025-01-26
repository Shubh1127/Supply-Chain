import { useEffect, useState } from 'react';
import { useBuyer } from '../../../Context/BuyerContext';
import Header from '../components/BuyerHeader';

const SearchProducts = () => {
  const { searchProducts, handleAddToCart, handleClick } = useBuyer();
  const [filters, setFilters] = useState({
    connectivity: [],
  });

  const handleFilterChange = (e) => {
    const { name, value, checked } = e.target;
    setFilters((prevFilters) => {
      if (checked) {
        return {
          ...prevFilters,
          [name]: [...prevFilters[name], value],
        };
      } else {
        return {
          ...prevFilters,
          [name]: prevFilters[name].filter((item) => item !== value),
        };
      }
    });
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/4 p-4">
            <h2 className="text-xl font-bold mb-4">Filters</h2>
            <div className="flex flex-col">
              <label>
                <input
                  type="checkbox"
                  name="connectivity"
                  value="usb"
                  onChange={handleFilterChange}
                />{' '}
                USB
              </label>
              <br />
              <label>
                <input
                  type="checkbox"
                  name="connectivity"
                  value="ps2"
                  onChange={handleFilterChange}
                />{' '}
                PS/2
              </label>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center gap-4">
            {searchProducts.map((product, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 w-full sm:w-[45vw] md:w-[30vw] flex flex-col cursor-pointer"
              >
                <img
                  src={product.photo}
                  alt={product.name}
                  onClick={() => handleClick(product._id)}
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
      </div>
    </>
  );
};

export default SearchProducts;