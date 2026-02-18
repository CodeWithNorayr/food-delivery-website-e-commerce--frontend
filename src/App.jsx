import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Order from './pages/Orders/Order'
import StoreContextProvider from './context/StoreContext'
import LoginPopUp from './components/LoginPopUp/LoginPopUp'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const App = () => {
  const [showLoginPopUp,setShowLoginPopUp] = useState(false)
  return (
    
    <StoreContextProvider>
      <div>
      <ToastContainer/>
        {showLoginPopUp?<LoginPopUp showLoginPopUp={showLoginPopUp} setShowLoginPopUp={setShowLoginPopUp}/>:<></>}
        <Navbar showLoginPopUp={showLoginPopUp} setShowLoginPopUp={setShowLoginPopUp}/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/orders' element={<Order />} />
          <Route path='/verify' element={<Verify />}/>
          <Route path='/userorders' element={<MyOrders />}/>
        </Routes>
      </div>
      </StoreContextProvider>
  )
}

export default App
