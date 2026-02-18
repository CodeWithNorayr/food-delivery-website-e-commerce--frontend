import React, { useContext, useEffect, useState } from 'react'
import './LoginPopUp.css'
import axios from "axios"
import { toast } from "react-toastify"
import { StoreContext } from '../../context/StoreContext'

const LoginPopUp = ({ setShowLoginPopUp }) => {
  const { setToken } = useContext(StoreContext)
  const [currState, setCurrState] = useState('Sign up')
  const backendURL = 'https://food-delivery-website-e-commerce-backend.onrender.com'

  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const url =
        currState === 'Sign up'
          ? `https://food-delivery-website-e-commerce-backend.onrender.com/api/user/registration`
          : `https://food-delivery-website-e-commerce-backend.onrender.com/api/user/login`

      const response = await axios.post(url, data)

      if (response.data.success) {
        setToken(response.data.token)
        localStorage.setItem('token', response.data.token)
        toast.success(response.data.message)
        setShowLoginPopUp(false)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong")
    }
  }

  useEffect(()=>{
    const tokenFromStorage = localStorage.getItem('token')
    if(tokenFromStorage){
      setToken(tokenFromStorage)
    }
  },[])


  return (
    <form className='login-section' onSubmit={onSubmitHandler}>
      <div className='login-topic'>
        <h1 className='login-state'>{currState}</h1>
        <button
          className='login-x'
          onClick={() => setShowLoginPopUp(false)}
          type='button'
        >
          X
        </button>
      </div>

      <div className='clas'>
        {currState === 'Sign up' && (
          <div className='name'>
            <p>Full name</p>
            <input
              className='input'
              onChange={onChangeHandler}
              name='name'
              value={data.name}
              type="text"
              placeholder='Enter your full name'
              required
            />
          </div>
        )}

        <div className='email'>
          <p>Email</p>
          <input
            className='input'
            onChange={onChangeHandler}
            type="email"
            name='email'
            value={data.email}
            placeholder='Enter your email address'
            required
          />
        </div>

        <div className='password'>
          <p>Password</p>
          <input
            className='input'
            onChange={onChangeHandler}
            type="password"
            name='password'
            value={data.password}
            placeholder='Enter your password'
            required
          />
        </div>

        <div className='span-login'>
          {currState === 'Sign up'
            ? <p>Do you already have an account? <span onClick={() => setCurrState('Log in')}>Click here</span></p>
            : <p>To create an account <span onClick={() => setCurrState('Sign up')}>Click here</span></p>
          }
        </div>

        <div className='checkbox'>
          <input type="checkbox" required />
          <p className='checkbox-p'>Agree with the terms and conditions of the company</p>
        </div>

        <div className='login-btn'>
          <button type='submit'>
            {currState === 'Sign up' ? 'Sign up' : 'Log in'}
          </button>
        </div>
      </div>
    </form>
  )
}

export default LoginPopUp
