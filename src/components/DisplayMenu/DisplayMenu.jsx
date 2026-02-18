import React, { useState } from 'react'
import './DisplayMenu.css'
import { menu_list } from '../../assets/assets'

const DisplayMenu = ({category,setCategory}) => {


  return (
    <div id='menu-section' className='menu-container'>
      <h1 className='menu-h1'>FAST AND CONVENIENT DELIVERY</h1>
      <div className='menu-section'>
        {menu_list.map((item, index) => (
          <div
            key={index}
            className='menu-items'
            onClick={() =>
              setCategory(prev =>
                prev === item.menu_name ? 'All' : item.menu_name
              )
            }
          >
            <img
              className={category === item.menu_name ? 'image active' : 'image'}
              src={item.menu_image}
              alt={item.menu_name}
            />
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DisplayMenu
