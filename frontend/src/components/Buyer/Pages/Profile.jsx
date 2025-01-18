import { useState, useEffect } from "react";
import { useBuyer } from '../../../Context/BuyerContext';
import Header from "../components/BuyerHeader";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { buyer, getProfile, updateProfile } = useBuyer();
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    profileImage: null,
    profileImageUrl: '',
    addresses: [
      {
        houseNo: '',
        street: '',
        city: '',
        state: '',
        pincode: '',
      }
    ]
  });

  useEffect(() => {
    if (buyer && !isEditing) {
      setUser({
        name: buyer.name,
        email: buyer.email,
        phoneNumber: buyer.phone,
        profileImageUrl: buyer.profileImageUrl,
        addresses: buyer.addresses,
      });
    }
  }, [buyer, isEditing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfile(user); // Update the profile with the new data
    setIsEditing(false); // Exit editing mode
  };

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
      <h2 className="p-4 ms-14 font-semibold text-xl">Your Details</h2>
      <div className="border border-gray-300 px-12 py-4 mx-5">
        {!isEditing ? (
          <div className="profile-view">
            <div className="flex items-center">
              <img
                src={user.profileImageUrl}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover"
              />
              <div className="ml-4">
                <h2 className="text-2xl font-semibold">{user.name}</h2>
                <p>{user.email}</p>
                <p>{user.phoneNumber}</p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-semibold">Addresses</h3>
              {user.addresses.map((address, index) => (
                <div key={index} className="mt-2">
                  <p>{address.houseNo}, {address.street}</p>
                  <p>{address.city}, {address.state}</p>
                  <p>{address.pincode}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="profile-edit">
            {/* Name field */}
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            {/* Email field */}
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            {/* Phone Number field */}
            <div className="mb-4">
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={user.phoneNumber}
                onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            {/* Addresses fields */}
            <div className="mb-4">
              <label className="block text-gray-700">Addresses</label>
              {user.addresses.map((address, index) => (
                <div key={index} className="mt-2">
                  <input
                    type="text"
                    name={`houseNo-${index}`}
                    value={address.houseNo}
                    onChange={(e) => {
                      const newAddresses = [...user.addresses];
                      newAddresses[index].houseNo = e.target.value;
                      setUser({ ...user, addresses: newAddresses });
                    }}
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                    placeholder="House No"
                  />
                  <input
                    type="text"
                    name={`street-${index}`}
                    value={address.street}
                    onChange={(e) => {
                      const newAddresses = [...user.addresses];
                      newAddresses[index].street = e.target.value;
                      setUser({ ...user, addresses: newAddresses });
                    }}
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                    placeholder="Street"
                  />
                  <input
                    type="text"
                    name={`city-${index}`}
                    value={address.city}
                    onChange={(e) => {
                      const newAddresses = [...user.addresses];
                      newAddresses[index].city = e.target.value;
                      setUser({ ...user, addresses: newAddresses });
                    }}
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                    placeholder="City"
                  />
                  <input
                    type="text"
                    name={`state-${index}`}
                    value={address.state}
                    onChange={(e) => {
                      const newAddresses = [...user.addresses];
                      newAddresses[index].state = e.target.value;
                      setUser({ ...user, addresses: newAddresses });
                    }}
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                    placeholder="State"
                  />
                  <input
                    type="text"
                    name={`pincode-${index}`}
                    value={address.pincode}
                    onChange={(e) => {
                      const newAddresses = [...user.addresses];
                      newAddresses[index].pincode = e.target.value;
                      setUser({ ...user, addresses: newAddresses });
                    }}
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                    placeholder="Pincode"
                  />
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default Profile;