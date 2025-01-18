import { useNavigate } from 'react-router-dom';
import { useBuyer } from '../../../Context/BuyerContext';
import { useState } from 'react';
import Header from '../components/BuyerHeader';

const Address = () => {
  const navigate = useNavigate();
  const { buyer, addAddress, updateAddress, deleteAddress, setDefaultAddress } = useBuyer();
  const [editingIndex, setEditingIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [address, setAddress] = useState({
    houseNo: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
  });

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

  const handleEdit = (index) => {
    setEditingIndex(index);
    setAddress(buyer.addresses[index]);
    setShowForm(true);
  };

  const handleDelete = async (index) => {
    await deleteAddress(index);
  };

  const handleSetDefault = async (index) => {
    await setDefaultAddress(index);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      await updateAddress(editingIndex, address);
    } else {
      await addAddress(address);
    }
    setShowForm(false);
    setEditingIndex(null);
    setAddress({
      houseNo: '',
      street: '',
      city: '',
      state: '',
      pincode: '',
    });
  };

  return (
    <>
      <Header />
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">Your Addresses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
          <div
            onClick={() => {
              setShowForm(true);
              setEditingIndex(null);
              setAddress({
                houseNo: '',
                street: '',
                city: '',
                state: '',
                pincode: '',
              });
            }}
            className="border-dashed border-2 border-gray-400 flex items-center justify-center p-6 rounded cursor-pointer hover:bg-gray-200"
          >
            <span className="text-blue-500 text-lg font-semibold ">Add New Address</span>
          </div>
          {buyer.addresses.map((address, index) => (
            <div key={index} className="border border-gray-300 p-4 rounded hover:bg-gray-200">
              <p>House No: {address.houseNo}</p>
              <p>Street: {address.street}</p>
              <p>City: {address.city}</p>
              <p>State: {address.state}</p>
              <p>Pincode: {address.pincode}</p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleEdit(index)}
                  className="text-blue-500 text-lg font-semibold hover:text-blue-600"
                >
                  Change
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-500 text-lg font-semibold hover:text-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleSetDefault(index)}
                  className="text-green-500 text-lg font-semibold hover:text-green-600"
                >
                  Set As Default
                </button>
              </div>
            </div>
          ))}
        </div>
        {showForm && (
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="mb-4">
              <label className="block text-gray-700">House No</label>
              <input
                type="text"
                name="houseNo"
                value={address.houseNo}
                onChange={(e) => setAddress({ ...address, houseNo: e.target.value })}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Street</label>
              <input
                type="text"
                name="street"
                value={address.street}
                onChange={(e) => setAddress({ ...address, street: e.target.value })}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">City</label>
              <input
                type="text"
                name="city"
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">State</label>
              <input
                type="text"
                name="state"
                value={address.state}
                onChange={(e) => setAddress({ ...address, state: e.target.value })}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Pincode</label>
              <input
                type="text"
                name="pincode"
                value={address.pincode}
                onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {editingIndex !== null ? 'Update Address' : 'Add Address'}
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default Address;