import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Search, ShoppingCart, Menu, MapPin } from 'lucide-react';
import { useBuyer } from '../../../Context/BuyerContext';

export default function Header() {
  const { buyer, searchItem } = useBuyer();
  const [showPopup, setShowPopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log(searchQuery);
      await searchItem(searchQuery);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center relative">
      <div className="flex items-center">
        <button className="lg:hidden mr-4" onClick={toggleMenu}>
          <Menu className="w-6 h-6" />
        </button>
        <Link to="/" className="text-xl font-bold">
          Supply Chain
        </Link>
      </div>
      <div className="hidden lg:flex items-center space-x-4">
        <form onSubmit={handleSearchSubmit} className="flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="p-2 border rounded-l-md"
          />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded-r-md">
            <Search className="w-5 h-5" />
          </button>
        </form>
        <Link to="/role/buyer/cart" className="relative">
          <ShoppingCart className="w-6 h-6" />
          {/* Add a badge for the cart items count */}
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
            3
          </span>
        </Link>
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <MapPin className="w-6 h-6 cursor-pointer" onClick={handleClick} />
          {showPopup && (
            <div className="absolute top-full mt-2 p-4 bg-white border rounded shadow-lg">
              <p>{buyer.addresses[0].street}</p>
              <p>{buyer.addresses[0].city}</p>
              <p>{buyer.addresses[0].state}</p>
              <p>{buyer.addresses[0].zip}</p>
            </div>
          )}
        </div>
        <nav className="hidden md:flex items-center ml-4 space-x-4">
          {buyer ? (
            <div className='mt-2 mr-2'>
              <Link to="/role/buyer/account" className="hover:text-gray-300 leading-3">
                <h2>Hi, {buyer.name}</h2>
                Your Account
              </Link>
            </div>
          ) : (
            <Link to="/role/buyer/account" className="hover:text-gray-300">Account</Link>
          )}
          <Link to="/role/buyer/orders" className="hover:text-gray-300">Orders</Link>
          <Link to="/role/buyer/cart" className="flex items-center hover:text-gray-300">
            <ShoppingCart className="h-5 w-5 mr-1" />
            Cart
          </Link>
        </nav>
      </div>
      {menuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-md p-4 z-10">
          <form onSubmit={handleSearchSubmit} className="flex items-center mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search..."
              className="p-2 border rounded-l-md w-full"
            />
            <button type="submit" className="p-2 bg-blue-500 text-white rounded-r-md">
              <Search className="w-5 h-5" />
            </button>
          </form>
          <Link to="/role/buyer/account" className="block mb-4 hover:text-gray-300">
            {buyer ? `Hi, ${buyer.name} - Your Account` : 'Account'}
          </Link>
          <Link to="/role/buyer/orders" className="block mb-4 hover:text-gray-300">Orders</Link>
          <Link to="/role/buyer/cart" className="block mb-4 flex items-center hover:text-gray-300">
            <ShoppingCart className="h-5 w-5 mr-1" />
            Cart
          </Link>
          <div
            className="flex items-center cursor-pointer"
            onClick={handleClick}
          >
            <MapPin className="w-6 h-6 mr-2" />
            <span>Address</span>
          </div>
        </div>
      )}
    </header>
  );
}