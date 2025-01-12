import { Routes,Route } from "react-router-dom"
import Home from './components/Home'
import Role from './components/Role'
import FarmerDashboard from './components/Farmer/FarmerDashboard'
import BuyerSignup from './components/Buyer/Auth/BuyerSignup'
import ProviderDashboard from './components/Provider/ProviderDashboard'
import SignupFarmer from './components/Farmer/Auth/SignupFarmer'
import LoginFarmer from "./components/Farmer/Auth/LoginFarmer"
import Page from './components/Buyer/Pages/Page'
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/role" element={<Role/>} />
      <Route path='/role/farmer/signup' element={<SignupFarmer/>} />
      <Route path='/role/farmer/login' element={<LoginFarmer/>} />
      <Route path="/role/farmer/*" element={<FarmerDashboard/>} />
      <Route path="/role/buyer/" element={<Page/>} />
      <Route path='/role/buyer/signup' element={<BuyerSignup/>} />
      <Route path="/role/provider/provider-dashboard" element={<ProviderDashboard/>} />
    </Routes>
  )
}

export default App

