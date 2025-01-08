import { Link } from 'react-router-dom'
import Footer from './Footer'
import { Truck } from 'lucide-react'
import { useFarmer } from '../Context/FarmerContext'
const Role = () => {
  const {user}=useFarmer();
  console.log(user)
  return (
    <>
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Link className="flex items-center justify-center" to={'/'} >
        <Truck className="h-6 w-6 text-blue-600" />
        <span className="ml-2 text-2xl font-bold text-gray-900">SupplyChainPro</span>
      </Link>
      
    </header>
    <div className=' h-[80vh] m-3 flex  items-center flex-col justify-center gap-10 mb-9'>
        <h1 className='font-bold text-3xl'>What&apos;s Your Role ?</h1>
        <div className='flex gap-10'>
          {user 
          &&
           <Link to={'/role/farmer/farmer-dashboard'} className='border  outline rounded p-3 bg-blue-500 hover:bg-blue-700 font-semibold text-white'>Farmer</Link> 
           || <Link to={'/role/farmer/signup'} className='border  outline rounded p-3 bg-blue-500 hover:bg-blue-700 font-semibold text-white'>Farmer</Link>
           }
        <Link to={'/role/farmer/buyer-dashboard'} className='border  outline rounded p-3 bg-blue-500 hover:bg-blue-700 font-semibold text-white'>Buyer</Link>
        <Link to={'/role/farmer/provider-dashboard'} className='border  outline rounded p-3 bg-blue-500 hover:bg-blue-700 font-semibold text-white'>Logistics Provider</Link>
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default Role