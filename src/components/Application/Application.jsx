import React from 'react'
import './Application.css'
import { assets } from '../../assets/assets'

const Application = () => {
  return (
    <div className='div-tag' id='application'>
      <h1 style={{fontFamily:'sans-serif',fontSize:20,fontWeight:900}} className='h1-tag'>ONE OF THE BEST FOOD DELIVERY WEBSITES</h1>
      <img className='image-tag' src={assets.application} alt="application" />
    </div>
  )
}

export default Application
