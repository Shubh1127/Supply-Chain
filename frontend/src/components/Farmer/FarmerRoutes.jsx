import { Routes, Route } from "react-router-dom";
import Dashboard from "./Home";
import Profile from "./Profile";
import InventoryGraph from "./InventoryGraph";
import AddProduct from "./AddProduct";
import DtoC from "./DtoC";
import Weather from "./Weather";
import Orders from "./Orders";
import LoginFarmer from "./Auth/LoginFarmer";
function FarmerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path='/login' element={<LoginFarmer/>} />
      <Route path="profile" element={<Profile />} />
      <Route path="inventory" element={<InventoryGraph />} />
      <Route path="Addproduct" element={<AddProduct />} />
      <Route path='D2C' element={<DtoC />} />
      <Route path='/weather' element={<Weather />} />
      <Route path='/orders' element={<Orders/>} />
    
    </Routes>
  );
}

export default FarmerRoutes;
