import { useState } from 'react';
import { Truck, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center justify-between">
      <Link className="flex items-center justify-center" to={'/'}>
        <Truck className="h-6 w-6 text-blue-600" />
        <span className="ml-2 text-2xl font-bold text-gray-900">SupplyChainPro</span>
      </Link>
      <nav className="hidden lg:flex ml-auto gap-4 sm:gap-6">
        <a className="text-sm font-medium hover:underline underline-offset-4" href="#features">
          Features
        </a>
        <Link className='font-semibold text-sm hover:underline underline-offset-4' to='/role'>Signup</Link>
        <a className="text-sm font-medium hover:underline underline-offset-4" href="#contact">
          Contact
        </a>
      </nav>
      <button className="lg:hidden" onClick={toggleMenu}>
        <Menu className="h-6 w-6 text-gray-900" />
      </button>
      {menuOpen && (
        <div className="absolute top-14 left-0 w-full bg-white shadow-md z-10">
          <nav className="flex flex-col items-center p-4">
            <a className="text-sm font-medium hover:underline underline-offset-4 mb-2" href="#features">
              Features
            </a>
            <Link className='font-semibold text-sm hover:underline underline-offset-4 mb-2' to='/role'>Signup</Link>
            <a className="text-sm font-medium hover:underline underline-offset-4" href="#contact">
              Contact
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;