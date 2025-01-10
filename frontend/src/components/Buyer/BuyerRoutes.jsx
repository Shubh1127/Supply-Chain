import {Routes,Route} from 'react-router-dom'
import { Home } from './Home'
import Page from './Pages/Page'
const BuyerRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Page/>} />
      <Route path='/home' element={<Home/>} />
    </Routes>
  )
}

export default BuyerRoutes