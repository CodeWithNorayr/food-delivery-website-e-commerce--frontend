import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import DisplayMenu from '../../components/DisplayMenu/DisplayMenu'
import DisplayFood from '../../components/DisplayFood/DisplayFood'
import Application from '../../components/Application/Application'
import Contact from '../../components/Contact/Contact'


const Home = () => {
  const [category,setCategory] = useState('All')
  return (
    <div>
      <Header/>
      <DisplayMenu category={category} setCategory={setCategory}/>
      <DisplayFood category={category} setCategory={setCategory}/>
      <Contact/>
    </div>
  )
}

export default Home
