import { useState, useEffect } from "react";
import { useFarmer } from '../../Context/FarmerContext';

const Profile = () => {
  const { farmer, getProfile, updateProfile } = useFarmer();
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    profileImage: null,
    profileImageUrl: '',
  });
  console.log(farmer);
  useEffect(() => {
    if (farmer) {
      setUser({
        name: farmer.name,
        email: farmer.email,
        phoneNumber: farmer.phone,
        profileImageUrl: farmer.profileImageUrl,
      });
    }
  }, [farmer]);

  useEffect(() => {
    getProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profileImage') {
      setUser({ ...user, profileImage: files[0] });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfile(user);
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto p-4">
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
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-600">{user.phoneNumber}</p>
              <button
                onClick={() => setIsEditing(true)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="profile-edit">
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="Number"
              name="phoneNumber"
              value={user.phoneNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Profile Image</label>
            <input
              type="file"
              name="profileImage"
              onChange={handleChange}
              accept="image/*"
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="flex items-center">
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded mr-2"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile;