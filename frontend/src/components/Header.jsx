import {  Truck } from 'lucide-react'
import { Link } from 'react-router-dom'
function Header() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Link className="flex items-center justify-center" to={'/'}>
        <Truck className="h-6 w-6 text-blue-600" />
        <span className="ml-2 text-2xl font-bold text-gray-900">SupplyChainPro</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <a className="text-sm font-medium hover:underline underline-offset-4" href="#features">
          Features
        </a>
        <Link className='font-semibold text-sm hover:underline underline-offset-4' to='/role'>Signup</Link>
        <a className="text-sm font-medium hover:underline underline-offset-4" href="#contact">
          Contact
        </a>
      </nav>
    </header>
  )
}

export default Header

