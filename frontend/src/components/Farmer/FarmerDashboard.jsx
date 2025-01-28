import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import FarmerRoutes from "./FarmerRoutes"; // Import FarmerRoutes
import "../../App.css";

const FarmerDashboard = () => {
  // State to handle sidebar toggle on smaller screens
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to close the sidebar
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <Header />
     
      <button
        className="lg:hidden p-2 m-2 rounded border"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <i className="fa-solid fa-bars"></i>
      </button>

      <div className="flex h-screen">
        {/* Sidebar */}
        <div
          className={`lg:h-[85vh]  sm:h-screen w-[15%] bg-gray-200 rounded-xl font-semibold ps-2 pt-4 flex flex-col  justify-evenly 
            ${isSidebarOpen ? "block" : "hidden"} lg:block
            transition-all duration-300`}
        >
          <Link
            to="/role/farmer/"
            className="block p-4 hover:bg-gray-300"
            onClick={closeSidebar} // Close sidebar on click
          >
            <i className="fa-solid fa-house mr-2"></i>
            <span className="hidden sm:inline">Home</span>
          </Link>
          <Link
            to="/role/farmer/inventory"
            className="block p-4 hover:bg-gray-300"
            onClick={closeSidebar} // Close sidebar on click
          >
            <i className="fa-solid fa-warehouse mr-2"></i>
            <span className="hidden sm:inline">Inventory</span>
          </Link>
          <Link
            to="/role/farmer/Addproduct"
            className="block p-4 hover:bg-gray-300"
            onClick={closeSidebar} // Close sidebar on click
          >
            <i className="fa-solid fa-plus mr-2"></i>
            <span className="hidden sm:inline">Add Product</span>
          </Link>
          <Link
            to="/role/farmer/chat"
            className="block p-4 hover:bg-gray-300"
            onClick={closeSidebar} // Close sidebar on click
          >
            <i className="fa-solid fa-diamond-turn-right mr-2"></i>
            <span className="hidden sm:inline">Chat with Consumer</span>
          </Link>
          <Link
            to="/role/farmer/weather"
            className="block p-4 hover:bg-gray-300"
            onClick={closeSidebar} // Close sidebar on click
          >
            <i className="fa-solid fa-cloud mr-2"></i>
            <span className="hidden sm:inline">Weather</span>
          </Link>
          <Link
            to="/role/farmer/orders"
            className="block p-4 hover:bg-gray-300"
            onClick={closeSidebar} // Close sidebar on click
          >
            <i className="fa-solid fa-cart-shopping mr-2"></i>
            <span className="hidden sm:inline">Orders</span>
          </Link>
          <Link
            to="/role/farmer/profile"
            className="block p-4 hover:bg-gray-300"
            onClick={closeSidebar} // Close sidebar on click
          >
            <i className="fa-solid fa-user mr-2"></i>
            <span className="hidden sm:inline">Profile</span>
          </Link>
          <div className="flex justify-evenly">
            <Link to={"/instagram"}></Link>
            <Link to={"/google"}></Link>
            <Link to={"/youtube"}></Link>
          </div>
        </div>

        {/* Main Content: shrinks when sidebar is open */}
        <div
          className={`transition-all duration-300 rounded-xl p-1  ${
            isSidebarOpen ? "w-[85%]" : "w-full"
          }`}
        >
          <FarmerRoutes />
        </div>
      </div>
    </>
  );
};

export default FarmerDashboard;