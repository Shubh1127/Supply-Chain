import {Link} from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Get to Know Us</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:underline">About Supply Chain Pro</Link></li>
              <li><Link to="/careers" className="hover:underline">Careers</Link></li>
              <li><Link to="/press" className="hover:underline">Press Releases</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect with Us</h3>
            <ul className="space-y-2">
              <li><Link to="/facebook" className="hover:underline">Facebook</Link></li>
              <li><Link to="/twitter" className="hover:underline">Twitter</Link></li>
              <li><Link to="/linkedin" className="hover:underline">LinkedIn</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Make Money with Us</h3>
            <ul className="space-y-2">
              <li><Link to="/sell" className="hover:underline">Sell on Supply Chain Pro</Link></li>
              <li><Link to="/partner" className="hover:underline">Become a Partner</Link></li>
              <li><Link to="/advertise" className="hover:underline">Advertise Your Products</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Let Us Help You</h3>
            <ul className="space-y-2">
              <li><Link to="/account" className="hover:underline">Your Account</Link></li>
              <li><Link to="/orders" className="hover:underline">Your Orders</Link></li>
              <li><Link to="/help" className="hover:underline">Help Center</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p>&copy; {new Date().getFullYear()} Supply Chain Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

