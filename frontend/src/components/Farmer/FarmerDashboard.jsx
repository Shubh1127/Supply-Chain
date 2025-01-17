import { Link } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import FarmerRoutes from "./FarmerRoutes"; // Import FarmerRoutes
import '../../App.css'
const FarmerDashboard = () => {
  return (
    <>
      <Header />
      <div className="flex">
        {/* Sidebar */}
        <div className="h-[84vh] w-[15%] bg-gray-200 rounded-xl font-semibold ps-2 pt-4 flex flex-col justify-evenly">
          <Link to="/role/farmer/" className="block p-4 hover:bg-gray-300"><i className="fa-solid fa-house mr-2"></i>Home</Link>
          <Link to="/role/farmer/inventory" className="block p-4 hover:bg-gray-300"><i className="fa-solid fa-warehouse mr-2"></i>Inventory</Link>
          <Link to="/role/farmer/Addproduct" className="block p-4 hover:bg-gray-300"><i className="fa-solid fa-plus mr-2"></i>Add Product</Link>
          <Link to="/role/farmer/D2C" className="block p-4 hover:bg-gray-300"><i className="fa-solid fa-diamond-turn-right mr-2"></i>Direct to Consumer</Link>
          <Link to="/role/farmer/weather" className="block p-4 hover:bg-gray-300"><i className="fa-solid fa-cloud mr-2"></i>Weather</Link>
          <Link to="/role/farmer/orders" className="block p-4 hover:bg-gray-300"><i className="fa-solid fa-cart-shopping mr-2"></i>Orders</Link>
          <Link to="/role/farmer/profile" className="block p-4 hover:bg-gray-300"><i className="fa-solid fa-user mr-2"></i>Profile</Link>  
          <div className="flex justify-evenly">
            <Link to={'/instagram'}></Link>
            <Link to={'/google'}></Link>
            <Link to={'/youtube'}> </Link>
          </div>
        </div>
        {/* Main Content */}
        <div className="h-[84vh] w-[85%] p-6 rounded-xl bg-[#bd3bc4] overflow-y-auto">
          <FarmerRoutes />
        </div>
      </div>
      <Footer />
    </>
  );
};


export default FarmerDashboard;
