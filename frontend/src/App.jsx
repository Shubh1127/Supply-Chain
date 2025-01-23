import { Routes,Route } from "react-router-dom"
import Home from './components/Home'
import Role from './components/Role'
import FarmerDashboard from './components/Farmer/FarmerDashboard'
import BuyerSignup from './components/Buyer/Auth/BuyerSignup'
import ProviderDashboard from './components/Provider/ProviderDashboard'
import SignupFarmer from './components/Farmer/Auth/SignupFarmer'
import LoginFarmer from "./components/Farmer/Auth/LoginFarmer"
import Page from './components/Buyer/Pages/Page'
import BuyerLogin from './components/Buyer/Auth/BuyerLogin'
import UserProtectedWrapper from "./components/Farmer/UserProtectedWrapper"
import Account from './components/Buyer/Pages/Account'
import Profile from './components/Buyer/Pages/Profile'
import Address from "./components/Buyer/Pages/Address"
import Orders from "./components/Buyer/Pages/Orders"
import Cart from "./components/Buyer/Pages/Cart"
import Buy from './components/Buyer/Pages/Buy'
import Category from "./components/Buyer/Pages/Category"
import SearchProducts from "./components/Buyer/Pages/SearchProducts"
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/role" element={<Role/>} />
      <Route path='/role/farmer/signup' element={<SignupFarmer/>} />
      <Route path='/role/farmer/login' element={<LoginFarmer/>} />
      <Route path="/role/farmer/*" element={
        <UserProtectedWrapper>
        <FarmerDashboard/>
        </UserProtectedWrapper>
        } />
      <Route path="/role/buyer/" element={<Page/>} />
      <Route path='/role/buyer/signup' element={<BuyerSignup/>} />
      <Route path='role/buyer/orders' element={<Orders/>} />
      <Route path="role/buyer/cart" element={<Cart/>} />
      <Route path='role/buyer/buy/:productId' element={<Buy/>} />
      <Route path='role/buyer/products/:category' element={<Category/>} />
      <Route path='role/buyer/search/:searchQuery' element={<SearchProducts/>} />
      <Route path='role/buyer/login' element={<BuyerLogin/>} />
      <Route path='/role/buyer/account' element={<Account/>} />
      <Route path='role/buyer/profile' element={<Profile/>}/>
      <Route path="role/buyer/address" element={<Address/>} />
      <Route path="/role/provider/provider-dashboard" element={<ProviderDashboard/>} />
    </Routes>
  )
}

export default App

