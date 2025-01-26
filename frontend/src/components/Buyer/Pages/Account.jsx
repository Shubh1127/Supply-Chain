import Header from "../components/BuyerHeader";
import { Link } from "react-router-dom";
import { useBuyer } from "../../../Context/BuyerContext";
const Account = () => {
  const {logout,buyer} =useBuyer();
  return (
    <div className="w-full h-full">
      <Header />
      <div className=" w-[40vw] text-center">
        <h2 className="font-semibold text-3xl p-4">Your Account</h2>
      </div>
      <div className="main h-max flex flex-col justify-center items-center gap-12 p-3 ps-[5vw]">
        <div className="flex gap-5">
          <Link to='/role/buyer/orders' className="border border-gray-300 rounded p-4 w-[25vw] h-[20vh] flex justify-center  cursor-pointer">
            <div className="h-max  ">
              <img src='https://m.media-amazon.com/images/G/31/x-locale/cs/ya/images/Box._CB485927553_.png'   />
            </div>
            <div className="ms-3">
              Your Orders
              <br />
              Track,return or buy things again
            </div>
          </Link>
            <Link to='/role/buyer/profile' className="border border-gray-300 rounded p-4 w-[25vw] h-[20vh] flex justify-center  cursor-pointer">
            <div >
              <img src="https://m.media-amazon.com/images/G/31/x-locale/cs/ya/images/sign-in-lock._CB485931504_.png" />
            </div>
            <div className="ms-3">
              Login & security
              <br />
              Edit login,name and mobile number
            </div>
          </Link>
          <Link  className="border border-gray-300 rounded p-4 w-[25vw] h-[20vh] flex justify-center  cursor-pointer">
            <div>
              <img src="https://m.media-amazon.com/images/G/31/x-locale/cs/ya/images/rc_prime._CB485926807_.png" />
            </div>
            <div className="ms-3">
              Your Chat&apos;s
              <br />
              View chat and send Messages
            </div>
          </Link>
          
        </div>
        <div className="flex gap-5">
        <Link to='/role/buyer/address' className="border border-gray-300 rounded p-4 w-[25vw] h-[20vh] flex justify-center  cursor-pointer">
            <div>
              <img src="https://m.media-amazon.com/images/G/31/x-locale/cs/ya/images/address-map-pin._CB485934183_.png" />
            </div>
            <div className="ms-3">
              Your Addresses
              <br />
              Edit addresses for orders and gifts
            </div>
          </Link>
        <div className="border border-gray-300 rounded p-4 w-[25vw] h-[20vh] flex justify-center  cursor-pointer">
            <div>
              <img src="https://m.media-amazon.com/images/G/31/AmazonBusiness/YAPATF/amazon_business_yap_atf._CB588250268_.jpg" />
            </div>
            <div className="ms-5">
              Your business account
              <br />
              Save up to 28% with GST invoice and bulk discount and purchase on credit 
            </div>
          </div>
          <div className="border border-gray-300 rounded p-4 w-[25vw] h-[20vh] flex justify-center  cursor-pointer">
            <div>
              <img src="https://m.media-amazon.com/images/G/31/x-locale/cs/ya/images/Payments._CB485926359_.png" />
            </div>
            <div className="ms-3">
              payment options
              <br />
              Edit or add payment methods
            </div>
          </div>
          
        </div>
      </div>

      {buyer && 
      <div className=" w-1/4  flex ms-12 ps-8 mt-8 justify-center">
        <button className="flex items-center px-4 py-2 bg-blue-500 font-semibold text-white rounded hover:bg-blue-600 " onClick={logout}>Logout</button>
      </div>
      }
    </div>
  );
};

export default Account;
