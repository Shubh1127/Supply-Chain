import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useFarmer } from "../../Context/FarmerContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { logout, farmer, inventoryLength } = useFarmer();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const data = [
    { name: 'Jan', sales: 4000 },
    { name: 'Feb', sales: 3000 },
    { name: 'Mar', sales: 5000 },
    { name: 'Apr', sales: 2780 },
    { name: 'May', sales: 1890 },
    { name: 'Jun', sales: 2390 },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".relative")) {
        setShowPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className=" h-max bg-white content-center px-2 sm:px-4 rounded-md ">
      <div className="h-max bg-sky-400 rounded-md pt-4 py-2 sm:py-6 text-black px-4">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 gap-4">
          <h1 className="text-2xl font-bold">Home</h1>
          <div className="flex flex-col sm:flex-row sm:flex w-max gap-2 sm:gap-4 items-center ">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              className="bg-white border text-black p-2  rounded"
            />
            <span className="text-black">to</span>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              className="bg-white border text-black p-2 rounded"
            />
          </div>
          <div className="h-max  flex items-center absolute sm:top-0 top-30 right-5 sm:right-0  gap-4 sm:relative">
            <div>{farmer && <p>{farmer.name}</p> || <p>User</p>}</div>
            <div
              className="w-10 h-10 relative cursor-pointer rounded-full"
              onClick={() => setShowPopup(!showPopup)}
            >
              {farmer && farmer.profileImageUrl ? (
                <img
                  src={farmer.profileImageUrl}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <img
                  src='https://t4.ftcdn.net/jpg/03/32/59/65/360_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg'
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              )}
              {showPopup && (
                <div className="absolute top-12 right-0 bg-white shadow-lg rounded-md w-40 p-2">
                  <ul className="space-y-2 text-sm">
                    <li
                      className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
                      onClick={() => navigate('/role/farmer/profile')}
                    >
                      Show Profile
                    </li>
                    <li
                      className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
                      onClick={() => logout()}
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-100 border p-4 rounded-xl">
            <div className="bg-white h-[12vh] shadow-xl p-4 rounded-xl">
              <h2 className="text-sm font-bold">Total Revenue</h2>
              <p className="text-xl">$45,231.89</p>
              <span className="text-green-500 text-xs">+20.1% from last month</span>
            </div>
          </div>
          <div className="bg-gray-100 border p-4 rounded-xl">
            <div className="bg-white h-[12vh] shadow-xl p-4 rounded-xl">
              <h2 className="text-sm font-bold">Inventory</h2>
              <p className="text-xl">{inventoryLength}</p>
              <span className="text-green-500 text-xs">+180.1% from last month</span>
            </div>
          </div>
          <div className="bg-gray-100 border p-4 rounded-xl">
            <div className="bg-white h-[12vh] shadow-xl p-4 rounded-xl">
              <h2 className="text-sm font-bold">Sales</h2>
              <p className="text-xl">+12,234</p>
              <span className="text-green-500 text-xs">+19% from last month</span>
            </div>
          </div>
          <div className="bg-gray-100 border p-4 rounded-xl">
            <div className="bg-white h-[12vh] shadow-xl p-4 rounded-xl">
              <h2 className="text-sm font-bold">Active Now</h2>
              <p className="text-xl">+573</p>
              <span className="text-green-500 text-xs">+201 since last hour</span>
            </div>
          </div>
        </div>

        {/* Overview Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-auto lg:h-[50vh]">
          <div className="bg-gray-100 border p-4 rounded-xl lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-lg h-full">
              <h2 className="text-xl font-semibold mb-4">Inventory Sales</h2>
              <ResponsiveContainer width="100%" height="80%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#4CAF50" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-gray-100 border p-4 rounded-xl">
            <div className="bg-white shadow-lg rounded-xl p-4 h-full">
              <h2 className="text-sm font-bold mb-4">Recent Sales</h2>
              <ul className="space-y-4">
                <li className="flex justify-between">
                  <span>Olivia Martin</span>
                  <span className="text-green-500">+$1,999.00</span>
                </li>
                <li className="flex justify-between">
                  <span>Jackson Lee</span>
                  <span className="text-green-500">+$39.00</span>
                </li>
                <li className="flex justify-between">
                  <span>Isabella Nguyen</span>
                  <span className="text-green-500">+$299.00</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
