import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const { cartItems, food_list, getTotalCartAmount, backendURL } = useContext(StoreContext)
  const filteredItems = food_list.filter((item) => cartItems[item._id] > 0)
  const navigate = useNavigate()

  return (
    <div>
      <div className='table-headers'>
            <p>Name</p>
            <p>Image</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
      </div>
      <div className='cart-section'>
        {filteredItems.length === 0 ? (
          <h1>Your cart is empty</h1>
        ) : (
          filteredItems.map((item, index) => (
            <div className='cartItems' key={index}>
              <p>{item.name}</p>
              <img src={`${item.image}`} alt="image" />
              <p>{item.price}</p>
              <p>{cartItems[item._id]}</p>
              <p>{item.price * cartItems[item._id]}</p>
              <hr />
            </div>
          )))}
      </div>
      <div>
        {filteredItems.length===0 ? 
        (
          <div className='zero-item'>
            <h1>Delivery fee</h1>
            <p>2</p>
          </div>
          ) 
          : 
          (
            <div className='cart-section-content'>        
              <div className='price'>
                <h1>Total Cart Price</h1>
                <p>{getTotalCartAmount()}</p>
              </div>

              <div className='fee'>
                <h1>Delivery fee</h1>
                <p>2</p>
              </div>

              <div className='charge'>
                <h1>Total charge</h1>
                <p>{getTotalCartAmount()+2}</p>
              </div>

              <div className='proceed-section'>
                <img onClick={()=>navigate('/orders')} src={assets.proceed} alt="proceed" />
              </div>
          </div>
          )
          }
      </div>
    </div>
  )
}
export default Cart
