import React from 'react'
import './Contact.css'
import { assets } from '../../assets/assets'

const Contact = () => {
  return (
    <>
    <div className='contact-section' id='contact'>

      <div className='details-section'>
        <h1>Phone:+37497214242</h1>
        <h1>Email:norayr.babayan@list.ru</h1>
        <h1>Gmail:babayann30@gmail.com</h1>
        <h1>Address:Yerevan Komitas 33a</h1>
      </div>

      <div className='policy-section'>
        <h1>Our Advantages</h1>
        <p>Speed</p>
        <p>Quality</p>
        <p>Transparency</p>
        <p>Tasty</p>
        <p>Delicious food</p>
        <p>Fresh food</p>
      </div>
      
      <div className='icon-section'>
        <a href="https://www.whatsapp.com/?lang=en"><img src={assets.whatsupp} alt='whatsapp'/></a>
        <a href='https://web.telegram.org/k/'><img src={assets.telegram} alt="telegram" /></a>
        <a href='https://www.facebook.com/'><img src={assets.facebook} alt="facebook" /></a>
        <a href='https://www.instagram.com/'><img src={assets.instagram} alt="instagram" /></a>
      </div>
    </div>
    <div>
      <h3 className='h3-tag'>@ All Copyrights Are Protected 2026</h3>
    </div>
    </>    
  )
}

export default Contact
