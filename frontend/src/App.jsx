import { Routes,Route } from "react-router-dom"
import Home from './components/Home'
import Role from './components/Role'
import FarmerDashboard from './components/Farmer/FarmerDashboard'
import BuyerDashboard from './components/Buyer/BuyerDashboard'
import ProviderDashboard from './components/Provider/ProviderDashboard'
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/role" element={<Role/>} />
      <Route path="/role/farmer/farmer-dashboard/*" element={<FarmerDashboard/>} />
      <Route path="/role/farmer/buyer-dashboard" element={<BuyerDashboard/>} />
      <Route path="/role/farmer/provider-dashboard" element={<ProviderDashboard/>} />
    </Routes>
  )
}

export default App

