import { useState, useEffect } from "react";
import { useBuyer } from '../../../Context/BuyerContext';
import Header from "../components/BuyerHeader";
const Profile = () => {
  const { buyer, getProfile, updateProfile } = useBuyer();
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    profileImage: null,
    profileImageUrl: '',
    address: {
      houseNo: '',
      street: '',
      city: '',
      state: '',
      pincode: '',
    }
  });

  

  useEffect(() => {
    if (buyer && !isEditing) {
      setUser({
        name: buyer.name,
        email: buyer.email,
        phoneNumber: buyer.phone,
        profileImageUrl: buyer.profileImageUrl,
        address: buyer.address,
      });
    }
  }, [buyer, isEditing]);  // Runs when buyer or isEditing changes

  // Load profile on component mount
  useEffect(() => {
    getProfile();
  }, []); // This will run only once on component mount

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profileImage') {
      setUser({ ...user, profileImage: files[0] });
    } else if (name.startsWith('address.')) {
      const key = name.split('.')[1];
      setUser({ ...user, address: { ...user.address, [key]: value } });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfile(user); // Update the profile with the new data
    setIsEditing(false); // Exit editing mode
  };

  return (
    <>
    <Header/>
    <h2 className="p-4 ms-14 font-semibold text-xl">Your Details</h2>
    <div className="border border-gray-300 px-12 py-4  mx-5">
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
              <p className="">{user.email}</p>
              <p className="">{user.phoneNumber}</p>
              <button
                onClick={() => setIsEditing(true)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                Edit
              </button>
            </div>
          </div>
        </div>
      ) : (
          <form onSubmit={handleSubmit} className="profile-edit">
          {/* Name field */}
          <div className="mb-4">
            <label className="block text-gray-700 ">Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded bg-gray-300"
              required
              />
          </div>
          
          {/* Email field */}
          <div className="mb-4">
            <label className="block text-gray-700 ">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded bg-gray-300"
              required
              />
          </div>
          
          {/* Phone Number field */}
          <div className="mb-4">
            <label className="block text-gray-700 ">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={user.phoneNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded bg-gray-300 bg-gray-300"
              required
              />
          </div>
          
          {/* Address fields */}
          <div className="flex flex-col">
            <div className="font-semibold ">Address</div>
            <div className="flex flex-wrap">
              <div className="mb-4 mr-3">
                <label className="block text-gray-700">House Number</label>
                <input
                  type="text"
                  name="address.houseNo"
                  value={user.address.houseNo}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded bg-gray-300"
                  required
                  />
              </div>
              <div className="mb-4 mr-3">
                <label className="block text-gray-700 ">Street</label>
                <input
                  type="text"
                  name="address.street"
                  value={user.address.street}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded bg-gray-300"
                  required
                />
              </div>
              <div className="mb-4 mr-3">
                <label className="block text-gray-700 ">City</label>
                <input
                  type="text"
                  name="address.city"
                  value={user.address.city}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded bg-gray-300"
                  required
                  />
              </div>
              <div className="mb-4 mr-3">
                <label className="block text-gray-700 ">State</label>
                <input
                  type="text"
                  name="address.state"
                  value={user.address.state}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded bg-gray-300"
                  required
                  />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 ">PinCode</label>
                <input
                  type="number"
                  name="address.pincode"
                  value={user.address.pincode}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded bg-gray-300"
                  required
                  />
              </div>
            </div>
          </div>
          
          {/* Profile Image field */}
          <div className="mb-4">
            <label className="block text-gray-700 ">Profile Image</label>
            <input
              type="file"
              name="profileImage"
              onChange={handleChange}
              accept="image/*"
              className="w-full px-3 py-2 border rounded bg-gray-300"
              />
          </div>
          
          {/* Save and Cancel buttons */}
          <div className="flex items-center">
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded mr-2 hover:bg-green-600"
              >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
              >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
      </>
  );
};

export default Profile;
