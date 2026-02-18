import React, { useEffect, useState } from 'react'
import './Header.css'
import { assets } from '../../assets/assets'

const Header = () => {

  const [index, setIndex] = useState(0)

  const headerImages = [
    {
      image: assets.foodDel4
    },
    {
      image: assets.delivery
    },
    {
      image: assets.foodDel5
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % headerImages.length)
      }, 300)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <img className='assets-delivery-image' src={headerImages[index].image} alt="delivery" />
    </div>
  )
}

export default Header
