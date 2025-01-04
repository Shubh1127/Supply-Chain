import { Link } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import FarmerRoutes from "./FarmerRoutes"; // Import FarmerRoutes

const FarmerDashboard = () => {
  return (
    <>
      <Header />
      <div className="flex">
        {/* Sidebar */}
        <div className="h-[84vh] w-[15%] bg-gray-200 rounded-xl font-semibold ps-2 pt-4">
          <Link to="/role/farmer/farmer-dashboard" className="block p-4">Home</Link>
          <Link to="/role/farmer/farmer-dashboard/profile" className="block p-4">Profile</Link>
          <Link to="/role/farmer/farmer-dashboard/inventory" className="block p-4">Inventory</Link>
          <Link to='/role/farmer/farmer-dashboard/Addproduct' className="block p-4">Add Product</Link>
          <Link to='/role/farmer/farmer-dashboard/D2C' className="block p-4">Direct to Consumer</Link>
          <Link to='/role/farmer/farmer-dashboard/weather' className="block p-4">Weather</Link>
          <Link to='/role/farmer/farmer-dashboard/orders' className="block p-4">Orders</Link>
        </div>
        {/* Main Content */}
        <div className="h-[84vh] w-[85%] p-6 rounded-xl bg-sky-300">
          <FarmerRoutes />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FarmerDashboard;
