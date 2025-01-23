import { useBuyer } from '../../../Context/BuyerContext'
import Header from '../components/BuyerHeader';
import { useEffect } from 'react';
const SearchProducts = () => {
    const {searchProducts,getProduct,addToCart } =useBuyer();
    // useEffect(()=>{
    //     getProducts();
    //   },[])
      const handleAddToCart = (productId) => {
        addToCart(productId); // Call addToCart with the productId when the button is clicked
      };
      const handleClick=(productId)=>{
        getProduct(productId)
      }
  return (
    <>
    <Header />
    <div className='flex p-4'>
    <div className="flex p-4 gap-5">
        {/* Filters section */}
        <div className="w-max p-4 border rounded-md">
          <h3 className="font-semibold text-lg mb-4">Filters</h3>

          {/* Delivery Day Filter */}
          <div className="mb-4">
            <h4 className="font-medium">Delivery Day</h4>
            <label>
              <input type="checkbox" name="delivery" value="tomorrow" /> Get It by Tomorrow
            </label>
            <br />
            <label>
              <input type="checkbox" name="delivery" value="two-days" /> Get It in 2 Days
            </label>
          </div>

          {/* Price Range Filter */}
          <div className="mb-4">
            <h4 className="font-medium">Price</h4>
            <input type="range" min="60" max="104700" value="104700" className="w-full" id="priceRange" />
            <div>₹<span id="priceValue">60</span> - ₹104,700+</div>
            <button className="mt-2 bg-yellow-400 p-1 rounded">Go</button>
          </div>

          {/* Deals & Discounts Filter */}
          <div className="mb-4">
            <h4 className="font-medium">Deals & Discounts</h4>
            <label>
              <input type="checkbox" name="discounts" value="all" /> All Discounts
            </label>
            <br />
            <label>
              <input type="checkbox" name="discounts" value="todays-deals" /> Today's Deals
            </label>
          </div>

          {/* Customer Reviews Filter */}
          <div className="mb-4">
            <h4 className="font-medium">Customer Review</h4>
            <label>
              <input type="radio" name="review" value="4-star" checked /> 4 Stars & Up
            </label>
            <br />
            <label>
              <input type="radio" name="review" value="3-star" /> 3 Stars & Up
            </label>
            <br />
            <label>
              <input type="radio" name="review" value="2-star" /> 2 Stars & Up
            </label>
          </div>

          {/* Connectivity Technology Filter */}
          <div className="mb-4">
            <h4 className="font-medium">Connectivity Technology</h4>
            <label>
              <input type="checkbox" name="connectivity" value="micro-usb" /> Micro USB
            </label>
            <br />
            <label>
              <input type="checkbox" name="connectivity" value="bluetooth" /> Bluetooth
            </label>
            <br />
            <label>
              <input type="checkbox" name="connectivity" value="usb-c" /> USB-C
            </label>
            <br />
            <label>
              <input type="checkbox" name="connectivity" value="rf" /> RF
            </label>
            <br />
            <label>
              <input type="checkbox" name="connectivity" value="usb-a" /> USB-A
            </label>
            <br />
            <label>
              <input type="checkbox" name="connectivity" value="wifi" /> Wi-Fi
            </label>
            <br />
            <label>
              <input type="checkbox" name="connectivity" value="infrared" /> Infrared
            </label>
            <br />
            <label>
              <input type="checkbox" name="connectivity" value="mini-usb" /> Mini USB
            </label>
            <br />
            <label>
              <input type="checkbox" name="connectivity" value="nfc" /> NFC
            </label>
            <br />
            <label>
              <input type="checkbox" name="connectivity" value="ps2" /> PS/2
            </label>
          </div>
        </div>
        </div>


      <div className='flex-1  flex flex-col items-center gap-4'>
        {searchProducts.map((product, index) => (
          <div key={index} className="border rounded-lg p-4 w-[30vw]  flex flex-col cursor-pointer" >
              <img
                src={product.photo}
                alt={product.name}
                onClick={()=>handleClick(product._id)}
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
          <div className='w-1/5 '>

          </div>
    </div>
    </>
  )
}

export default SearchProducts