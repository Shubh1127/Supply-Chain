import { useBuyer } from "../../../Context/BuyerContext";
// import { useNavigate } from "react-router-dom";
import Header from "../components/BuyerHeader";
import { useState,useEffect } from "react";
import FeaturedProducts from "../components/FeaturedProducts";
const Buy = () => {
  const [showPopup, setShowPopup] = useState(false);
//   const navigate = useNavigate();
  const { item } = useBuyer();
 
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onMouseEnter = () => {
    setShowPopup(true);
  };
  const onMouseLeave = () => {
    setShowPopup(false);
  };
  return (
    <>
      <Header />
      <div className=" w-full h-max   flex ">
        <div
          className="imgae-section  pt-5 p-4   static"
        >
          <img
           onMouseEnter={onMouseEnter}
           onMouseLeave={onMouseLeave}
            src={item.photo}
            className="rounded-lg w-[35vw] mt-12 border-gray-400 border "
          />
          {showPopup && (
            <div className="absolute top-[9vh] w-[62vw] h-[75vh] left-[36vw] mt-2 p-4 bg-white text-black border rounded shadow-lg z-10">
              <img
                src={item.photo}
                className="rounded-lg   w-full h-full "
              />
            </div>
          )}
        </div>
        <div className="order-section flex  flex-1">
          <div className=" w-[38vw] p-4">
            <div className="text-3xl h-[20vh]  m-2">
              {item.description}
            </div>
            <div className="h-[10vh]  m-2">
            <p className="text-md font-semibold mb-2 flex ">
                        <div>₹</div>
                        <span className="text-2xl">{item.price}.00</span>
            </p>
            <p>Inclusive of all taxes</p>
            </div>
            <div className="b h-[5vh] m-2">Use By {item.date}</div>
            <div className="  h-max  m-2 flex items-center gap-3">
                <span className="flex flex-col">
                <img src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/trust_icon_free_shipping_81px._CB562549966_.png"/>
                <span>Free Delivery</span>
                </span>
                <span className="flex flex-col ">
                <img src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-cod._CB562506657_.png"/>
                <span>Pay on Delivery</span>
                </span>
                <span>
                <img src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-returns._CB562506492_.png"/>
                <span>Non Refundable</span>
                </span>
                <span>
                <img src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-amazon-delivered._CB562550117_.png"/>
                <span>SupplyPro Delivered</span>
                </span>
                <span>
                <img src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/Secure-payment._CB650126890_.png"/>
                <span>Secure Payment</span>
                </span>
            </div>
            <div className=" h-[10vh] m-2">items Details
                <br/>
                <span className="flex flex-col">
                {item.name}
                {item.category}
                {item.description}
                </span>
            </div>
          </div>
          <div className="flex-1 mt-4">
            <div className="h-[10vh]  m-2">
            <p className="text-md font-semibold mb-2 flex ">
                        <div>₹</div>
                        <span className="text-2xl">{item.price}.00</span>
            </p>
            </div>
            <div className=" h-[5vh] m-2">delivery date</div>
            <div className="  h-[10vh] m-2">
                {/* {buyer.address} */}
            </div>
            <div className="   h-[20vh]  m-2">
                <div className="flex flex-col">
                    <p className="text-green-600">In Stock</p>
                    <span className="flex gap-3">
                    <p>Payment</p>
                    <p className="text-blue-400">Secure transaction</p>
                    </span>
                </div>
            </div>
            <div className="h-[10vh] bg-yellow-400 m-2">quantity and buy button</div>
          </div>
        </div>
      </div>
        <FeaturedProducts />
    </>
  );
};

export default Buy;
