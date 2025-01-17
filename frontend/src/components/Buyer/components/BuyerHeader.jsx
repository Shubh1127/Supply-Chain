import {Link} from 'react-router-dom'
// import { input } from "@/components/ui/input"
// import { button } from "@/components/ui/button"
import { Search, ShoppingCart, Menu, MapPin } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center py-2">
          <Link to="/role/buyer/" className="text-2xl font-bold mr-4">Supply Chain Pro</Link>
          <div className="flex items-center text-sm mr-4">
            <MapPin className="h-4 w-4 mr-1" />
            <span>Deliver to Your Business</span>
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
            <Link to="/role/buyer/account" className="hover:text-gray-300">Account</Link>
            <Link to="/orders" className="hover:text-gray-300">Orders</Link>
            <Link to="/cart" className="flex items-center hover:text-gray-300">
              <ShoppingCart className="h-5 w-5 mr-1" />
              Cart
            </Link>
          </nav>
          <button  size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex py-2 space-x-4 text-sm">
          <Link to="/inventory" className="hover:text-gray-300">Inventory</Link>
          <Link to="/logistics" className="hover:text-gray-300">Logistics</Link>
          <Link to="/analytics" className="hover:text-gray-300">Analytics</Link>
          <Link to="/suppliers" className="hover:text-gray-300">Suppliers</Link>
          <Link to="/deals" className="hover:text-gray-300">Today&apos;s Deals</Link>
        </nav>
      </div>
    </header>
  )
}

