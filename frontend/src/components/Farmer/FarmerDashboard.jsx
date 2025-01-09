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
          <Link to="/role/farmer/" className="block p-4">Home</Link>
          <Link to="/role/farmer/profile" className="block p-4">Profile</Link>
          <Link to="/role/farmer/inventory" className="block p-4">Inventory</Link>
          <Link to='/role/farmer/Addproduct' className="block p-4">Add Product</Link>
          <Link to='/role/farmer/D2C' className="block p-4">Direct to Consumer</Link>
          <Link to='/role/farmer/weather' className="block p-4">Weather</Link>
          <Link to='/role/farmer/orders' className="block p-4">Orders</Link>
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
