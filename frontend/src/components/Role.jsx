import { Link } from 'react-router-dom';
import Footer from './Footer';
import { Truck } from 'lucide-react';
import { useFarmer } from '../Context/FarmerContext';
import { useBuyer } from '../Context/BuyerContext';

const Role = () => {
  const { farmer } = useFarmer();
  const { buyer } = useBuyer();

  return (
    <>
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" to={'/'}>
          <Truck className="h-6 w-6 text-blue-600" />
          <span className="ml-2 text-2xl font-bold text-gray-900">SupplyChainPro</span>
        </Link>
      </header>
      <div className='h-[80vh] m-3 flex items-center flex-col justify-center gap-10 mb-9'>
        <h1 className='font-bold text-3xl text-center'>What&apos;s Your Role?</h1>
        <div className='flex flex-col sm:flex-row gap-4 sm:gap-10'>
          {farmer ? (
            <Link to={'/role/farmer/'} className='border outline rounded p-3 bg-blue-500 hover:bg-blue-700 font-semibold text-white text-center'>
              Farmer
            </Link>
          ) : (
            <Link to={'/role/farmer/signup'} className='border outline rounded p-3 bg-blue-500 hover:bg-blue-700 font-semibold text-white text-center'>
              Farmer
            </Link>
          )}
          {buyer ? (
            <Link to={'/role/buyer/'} className='border outline rounded p-3 bg-blue-500 hover:bg-blue-700 font-semibold text-white text-center'>
              Buyer
            </Link>
          ) : (
            <Link to={'/role/buyer/signup'} className='border outline rounded p-3 bg-blue-500 hover:bg-blue-700 font-semibold text-white text-center'>
              Buyer
            </Link>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Role;