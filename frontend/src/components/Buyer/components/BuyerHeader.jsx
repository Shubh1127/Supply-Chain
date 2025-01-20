import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Search, ShoppingCart, Menu, MapPin } from 'lucide-react';
import { useBuyer } from '../../../Context/BuyerContext';

export default function Header() {
  const { buyer } = useBuyer();
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    if (buyer && buyer.addresses.length > 0) {
      setShowPopup(true);
    }
  };

  const handleMouseLeave = () => {
    setShowPopup(false);
  };

  const handleClick = () => {
    navigate('/role/buyer/address');
  };

  const defaultAddress = buyer?.addresses?.find(address => address.isDefault) || buyer?.addresses[0];

  return (
    <header className="bg-gray-900 text-white h-max p-1">
      <div className="container mx-auto px-4">
        <div className="flex items-center py-2">
          <Link to="/role/buyer/" className="text-2xl font-bold mr-4">Supply Chain Pro</Link>
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
          >
            <span className='flex gap-2 mr-6 cursor-pointer'><MapPin />Deliver to Your address</span>
            {showPopup && defaultAddress && (
              <div className="absolute top-full left-0 mt-2 p-4 bg-white text-black border rounded shadow-lg z-10"
                style={{ width: '220px', minHeight: '100px' }}
              >
                <div className='flex flex-col gap-2'>
                  <p>{defaultAddress.houseNo}</p>
                  <p>{defaultAddress.street}</p>
                  <span className='flex '>
                    <p>{defaultAddress.city}</p>,
                    <p>&nbsp;{defaultAddress.state}</p>
                    <p>&nbsp;{defaultAddress.pincode}</p>
                  </span>
                  <p>India</p>
                  <p>phone: {buyer.phone}</p>
                </div>
              </div>
            )}
          </div>
          <div className="flex-grow flex items-center">
            <div className="w-full max-w-xl flex ">
              <input type="search" placeholder="Search Supply Chain Pro" className="rounded-r-none flex-1 rounded-md p-2" />
              <button type="submit" className="rounded-l-none bg-yellow-400 hover:bg-yellow-500 text-black p-2 rounded">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>
          <nav className="hidden md:flex items-center ml-4 space-x-4">
            {buyer && <div className='mt-2 mr-2'>
              <Link to="/role/buyer/account" className="hover:text-gray-300  leading-3 ">
                <h2>Hi ,{buyer.name}</h2>
                your  Account</Link>
            </div>
              ||
              <Link to="/role/buyer/account" className="hover:text-gray-300">Account</Link>
            }
            <Link to="/role/buyer/orders" className="hover:text-gray-300">Orders</Link>
            <Link to="/role/buyer/cart" className="flex items-center hover:text-gray-300">
              <ShoppingCart className="h-5 w-5 mr-1" />
              Cart
            </Link>
          </nav>
          <button size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}