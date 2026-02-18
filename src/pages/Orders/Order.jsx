import React, { useContext, useEffect, useState } from 'react'
import './Order.css'
import axios from "axios"
import { StoreContext } from '../../context/StoreContext'
import { toast } from 'react-toastify'

const Order = () => {
  const {getTotalCartAmount,food_list,cartItems,token,backendURL} = useContext(StoreContext)
  const [data,setData] = useState({
    firstname:'',
    lastname:'',
    email:'',
    streetcode:'',
    zipcode:'',
    state:'',
    city:'',
    country:'',
    phone:''
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData((data)=>({...data,[name]:value}))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    let orderItems = []
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo = item;
        itemInfo['quantity'] = cartItems[item._id]
        orderItems.push(itemInfo)
      }
    })
    let orderData = {
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2
    }
    let response = await axios.post(`${backendURL}/api/order/place`,orderData,{headers:{token}})
    if(response.data.success){
      const {session_url} = response.data;
      window.location.replace(session_url)
    } else {
      alert('An error occurred')
    }
  }

  return (
    <form className='order-container' onSubmit={onSubmitHandler}>
      <div className='order-title'>
        <h1>THIS IS ONE OF THE BEST ONLINE FOOD DELIVERY PLATFORMS, ENJOY !</h1>
      </div>
      <div className='firstname'>
        <p className='name-tag'>First Name</p>
        <input onChange={onChangeHandler} className='name-input' name='firstname' value={data.firstname} type="text" placeholder='Enter your first name ...' required/>  
      </div>
      <div className='lastname'>
        <p className='lastname-tag'>Last Name</p>
        <input onChange={onChangeHandler} className='lastname-input' name='lastname' value={data.lastname} type="text" placeholder='Enter your last name ...' required/>
      </div>
      <div className='emailing'>
        <p className='email-tag'>Email</p>
        <input onChange={onChangeHandler} className='email-input' name='email' value={data.email} type="email" placeholder='Enter your email @ ...' required/>
      </div>
      <div className='streetcode'>
        <p className='streetcode-tag'>Street Code</p>
        <input onChange={onChangeHandler} className='streetcode-input' name='streetcode' value={data.streetcode} type="text" placeholder='Enter your street code ...' required/>
      </div>
      <div className='zipcode'>
        <p className='zipcode-tag'>Zip Code</p>
        <input onChange={onChangeHandler} className='zipcode-input' name='zipcode' value={data.zipcode} type="text" placeholder='Enter your zip code ...' required/>
      </div>
      <div className='state'>
        <p className='state-tag'>State</p>
        <input onChange={onChangeHandler} className='state-input' name='state' value={data.state} type="text" placeholder='Enter your State ...' required/>
      </div>
      <div className='city'>
        <p className='city-tag'>City</p>
        <input onChange={onChangeHandler} className='city-input' name='city' value={data.city} type="text" placeholder='Enter your City ...' required/>
      </div>
      <div className='country'>
        <p className='country-tag'>Country</p>
        <input onChange={onChangeHandler} className='country-input' name='country' value={data.country} type="text" placeholder='Enter your Country' required/>
      </div>
      <div className='phone'>
        <p className='phone-tag'>Phone number</p>
        <input onChange={onChangeHandler} className='phone-input' name='phone' value={data.phone} type="text" placeholder='Enter your Phone number ...' required/>
      </div>  
      <div className='order-price'>
        <h1 className='order-price-tag'>Total Cart Price</h1>
        <p className='order-price-p-tag'>{getTotalCartAmount()}</p>
      </div>

      <div className='order-fee'>
        <h1 className='order-price-tag'>Delivery fee</h1>
        <p className='order-price-p-tag'>2</p>
      </div>

      <div className='order-charge'>
        <h1 className='order-price-tag'>Total charge</h1>
        <p className='order-price-p-tag'>{getTotalCartAmount()+2}</p>
      </div>

      <div className='btn-submit'>
        {token ? 
        (
          <button className='btn-submit' type='submit'>Submit</button>
        ) 
        : 
        (
          <button className='btn-submit' type='button' onClick={()=>toast.warn("Sign Up to make an order")}>Sign Up to make an order</button>
        )
        }
        
      </div>
    </form>
  )
}

export default Order
