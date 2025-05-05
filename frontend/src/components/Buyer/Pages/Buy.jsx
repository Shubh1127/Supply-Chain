import { useBuyer } from "../../../Context/BuyerContext";
import { MapPin } from "lucide-react";
import axios from "axios";
import Header from "../components/BuyerHeader";
import { useState, useEffect, useCallback } from "react";
import FeaturedProducts from "../components/FeaturedProducts";
import { Plus, Trash } from 'lucide-react';
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { initiatePayment } from "../../../Context/Paymentcontext";
const Buy = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const { item, setItem, setMessage, buyer, productfarmer, setProductFarmer, addToCart } = useBuyer();
  const [quantity, setQuantity] = useState(1);
  let defaultAddressAddress = {};
  if (buyer && buyer.addresses.length > 0) {
    defaultAddressAddress = buyer?.addresses?.find(address => address.isDefault) || buyer?.addresses[0];
  }

  
  const handleChatWithFarmer = () => {
    navigate(`/role/buyer/buy/chat/${productId}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onMouseEnter = () => {
    setShowPopup(true);
  };
  const onMouseLeave = () => {
    setShowPopup(false);
  };

  const handleClick = (productId) => {
    addToCart(productId);
  };

  const memoizedGetProduct = useCallback(async (productId) => {
    try {
      const response = await axios.get(`https://supply-chain-igtk.onrender.com/buyer/product/${productId}`);
      setItem(response.data.product);
      setProductFarmer(response.data.farmer);
    } catch (error) {
      setMessage(error.response.data.message || 'Error fetching product');
    }
  }, [setItem, setProductFarmer, setMessage]);

  useEffect(() => {
    if (productId) {
      setItem(null);
      setProductFarmer(null);
      memoizedGetProduct(productId);
    }
  }, [productId, memoizedGetProduct]);

  if (!item) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading product details...</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="w-full h-max flex flex-col lg:flex-row">
        <div className="image-section pt-5 p-4 static lg:w-1/2">
          <img
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            src={item.photo}
            className="rounded-lg w-full lg:w-[35vw] mt-12 border-gray-400 border"
          />
          {showPopup && (
            <div className="absolute top-[9vh] w-[90vw] lg:w-[62vw] h-[75vh] left-[5vw] lg:left-[36vw] mt-2 p-4 bg-white text-black border rounded shadow-lg z-10">
              <img
                src={item.photo}
                className="rounded-lg w-full h-full"
              />
            </div>
          )}
        </div>
        <div className="order-section flex flex-col lg:flex-row flex-1">
          <div className="w-full lg:w-[36vw] p-4">
            <div className="text-3xl h-max  m-2 ">
              {item.description}
            </div>
            <div className="h-[10vh]  m-2">
              <p className="text-md font-semibold mb-2 flex">
                <div>₹</div>
                <span className="text-2xl">{item.price}.00</span>
              </p>
              <p>Inclusive of all tax</p>
            </div>
            <div className="b h-[5vh] m-2">Use By {item.date}</div>
            <div className="h-max m-2 flex text-sm mb-4 items-center gap-3">
              <span className="flex flex-col">
                <img className="h-10 " src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/trust_icon_free_shipping_81px._CB562549966_.png" />
                <span>Free Delivery</span>
              </span>
              <span className="flex flex-col">
                <img className="h-12" src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-cod._CB562506657_.png" />
                <span>Pay on Delivery</span>
              </span>
              <span>
                <img className="h-10" src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-returns._CB562506492_.png" />
                <span>Non Refundable</span>
              </span>
              <span>
                <img className="h-12" src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-amazon-delivered._CB562550117_.png" />
                <span>SupplyPro Delivered</span>
              </span>
              <span>
                <img className="h-12" src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/Secure-payment._CB650126890_.png" />
                <span>Secure Payment</span>
              </span>
            </div>
            <div className="h-max  m-2">
              <span className="font-semibold mb-4  text-lg">About this item</span>
              <br />
              <span className="flex mb-4  flex-col">
                <span className="flex  mb-4 gap-1">
                  <p className="font-semibold">Item :</p>
                  <p>{item.name}</p>
                </span>
                <span className="flex mb-4  gap-1">
                  <p className="font-semibold">Category :</p>
                  <p>{item.category}</p>
                </span>
                <span className="flex  mb-4 gap-1">
                  <p className="font-semibold">Date :</p>
                  <p>{item.date}</p>
                </span>
                <span className="flex mb-4  gap-1">
                  <p className="font-semibold">Description</p>
                  <p>{item.description}</p>
                </span>
              </span>
            </div>
          </div>
          <div className="flex-1 mt-12 border m-2 border-gray-400 p-1 ">
            <div className="h-[10vh] m-2">
              <p className="text-md font-semibold mb-2 flex">
                <div>₹</div>
                <span className="text-2xl">{item.price}.00</span>
              </p>
            </div>
            <div className="h-[5vh] m-2">delivery date</div>
            <div className="h-[10vh] m-2">
              <div className="flex flex-col cursor-pointer leading-3">
                <span className="flex gap-2 items-center">
                  <MapPin scale={0.5} />
                  <p className="text-blue-500">Delivering to</p>
                </span>
                <br />
                <div className="text-blue-500">
                  <Link to='/role/buyer/address' className='cursor-pointer flex gap-1'>
                  {defaultAddressAddress && (
                    <>
                    <span>{defaultAddressAddress.houseNo}</span>
                    <span>{defaultAddressAddress.street}</span>
                    <span>{defaultAddressAddress.city}</span>
                    <span>{defaultAddressAddress.state}</span>
                    <span>{defaultAddressAddress.pincode}</span>
                    </>
                    || <p>Your Address</p>
                  )}
                  </Link>
                </div>
              </div>
            </div>
            <div className="h-max my-4 m-2">
              <div className="flex flex-col">
                <p className="text-green-600">In Stock</p>
                <span className="grid grid-cols-2 grid-rows-3 gap-y-1 gap-x-0.5 w-full lg:w-2/4">
                  <div>Payment</div>
                  <div className="text-blue-400">Secure transaction</div>
                  <div>Ships from</div>
                  <div className="text-blue-400">SupplyPro</div>
                  <div>Sold By</div>
                  <div className="text-blue-400">{productfarmer.name} {productfarmer?.address?.city}</div>
                </span>
              </div>
            </div>
            <div className="h-max flex flex-col items-center  w-full lg:w-[25vw] m-2">
              <div className="flex flex-col lg:flex-row gap-6 items-start w-full">
                <span className="flex gap-6 border-2  rounded-md p-2 cursor-pointer">
                  <Trash onClick={()=>setQuantity(quantity>1?quantity-1:1)} /> {quantity} <Plus  onClick={()=>setQuantity(quantity+1)} />
                </span>
                <span className="flex gap-6 border rounded-md p-2 cursor-pointer bg-blue-500 hover:bg-blue-700 text-white " onClick={() => handleClick(item._id)}>Add To Cart</span>
                <button onClick={handleChatWithFarmer} className="flex gap-6 border rounded-md p-2 cursor-pointer bg-blue-500 hover:bg-blue-700 text-white">Chat with Farmer</button>
              </div>
              <button
                className="bg-blue-500 text-white w-[98%] p-2 mr-4 rounded-md mt-4"
                onClick={() => {
                  initiatePayment(item, buyer);
                  navigate("/role/buyer/payment");
                }}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <FeaturedProducts />
    </>
  );
};

export default Buy;