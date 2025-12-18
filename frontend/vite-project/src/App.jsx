
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NewForm from './assets/components/NewForm'
import LoginPage from './assets/components/LoginPage'
import { Route, Routes } from 'react-router-dom'
import Product from './assets/components/Product'
import Shophome from './assets/components/Shophome'
import ViewProducts from './assets/components/ViewProducts'
import EditProduct from './assets/components/EditProduct'
import UserReg from './assets/components/UserReg'
import UserHome from './assets/components/UserHome'
import AllShopProducts from './assets/components/AllShopProducts'
import BookedInShop from './assets/components/BookedInShop'
import DrReg from './assets/components/DrReg'
import DoctorHome from './assets/components/DoctorHome'
import BookDoctor from './assets/components/BookDoctor'
import AllDoctors from './assets/components/AllDoctors'
import DoctorAppointments from './assets/components/DoctorAppointments'
import AdminHome from './assets/components/AdminHome'
import AllUsers from './assets/components/AllUsers'




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path='/NewForm' element={<NewForm/>}/>
      <Route path='/' element={<LoginPage/>}/>
      <Route path='/Product/:id' element={<Product/>}/>
      <Route path='/Shophome' element={<Shophome/>}/>
      <Route path='/ViewProducts/:id' element={<ViewProducts/>}/>
      <Route path='/EditProduct/:id' element={<EditProduct/>} />

      <Route path='UserReg' element={< UserReg/>}></Route>
      <Route path='UserHome/:id' element={<UserHome/>}></Route>
      <Route path='AllShopProducts/:id' element={<AllShopProducts/>}></Route>
      <Route path="/BookedInShop/:id" element={<BookedInShop />} />

      <Route path='/DrReg' element={<DrReg/>} ></Route>
      <Route path='/DoctorHome' element={<DoctorHome/>}></Route>
      <Route path='/BookDoctor/:doctorId' element={<BookDoctor />} />
      <Route path='/AllDoctors/:id' element={<AllDoctors/>} ></Route>
      <Route path='/DoctorAppointments/:id' element={<DoctorAppointments/>} ></Route>
      <Route path='/AdminHome' element={<AdminHome/>} ></Route>
      <Route path='/AllUsers/:id' element={<AllUsers/>} ></Route>
    </Routes>
    
   
    </>
  )
}

export default App
