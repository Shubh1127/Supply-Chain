import { useBuyer } from '../../../Context/BuyerContext';
import Header from '../components/BuyerHeader';
import { useNavigate } from 'react-router-dom';

const Address = () => {
  const navigate = useNavigate();
  const { buyer } = useBuyer();

  if (!buyer) {
    return (
      <>
        <Header />
        <div className="w-full h-full flex flex-col justify-center items-center">
          <h2 className="text-3xl font-semibold mb-4 p-4">Login First</h2>
          <button
            onClick={() => navigate('/role/buyer/login')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Go to Login
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">Your Addresses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Add Address Card */}
          <div className="border-dashed border-2 border-gray-400 flex items-center justify-center p-6 rounded">
            <button
              onClick={() => navigate('/add-address')}
              className="text-blue-500 text-lg font-semibold"
            >
              + Add Address
            </button>
          </div>

          {/* Display Addresses */}
          {buyer.addresses?.map((address, index) => (
            <div key={index} className="border p-4 rounded shadow-md">
              <p className="font-bold">{address.houseNo}</p>
              <p>{address.street}</p>
              <p>{address.city}, {address.state} {address.pincode}</p>
              <p>India</p>
              <p>Phone: {buyer.phone}</p>
              <div className="flex justify-between mt-4">
                <button className="text-blue-500 hover:underline" onClick={() => navigate(`/change-address/${index}`)}>
                  Change
                </button>
                <button className="text-blue-500 hover:underline" onClick={() => navigate(`/delete-address/${index}`)}>
                  Delete
                </button>
                <button className="text-blue-500 hover:underline" onClick={() => console.log('Set as default')}>
                  Set as default
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Address;
