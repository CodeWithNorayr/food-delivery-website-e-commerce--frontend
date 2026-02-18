import { createContext, useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"


export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

  const backendURL = 'http://localhost:4000'
  const [cartItems, setCartItems] = useState({})
  const [food_list, setFoodList] = useState([])
  const [token, setToken] = useState('')


  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/food/list`)
      if (response.data.success) {
        setFoodList(response.data.data)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(response.data.message)
    }
  }


  useEffect(() => {
    const savedToken = localStorage.getItem("token")
    if (savedToken) {
      setToken(savedToken)
      loadCartData(savedToken)
    }
    fetchFoodList()
  }, [])



  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
    }
    if (token) {
      await axios.post(`${backendURL}/api/cart/add`, { itemId }, { headers: { token } })
    }
  }

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    if (token) {
      await axios.post(`${backendURL}/api/cart/remove`, { itemId }, { headers: { token } })
    }
  }

  const getTotalCartAmount = () => {
    let totalCartAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((food) => String(food._id) === String(item))
        totalCartAmount += itemInfo.price * cartItems[item]
      }
    }
    return totalCartAmount;
  }

  const loadCartData = async (token) => {
    const response = await axios.post(`${backendURL}/api/cart/get`, {}, { headers: { token } })
    setCartItems(response.data.data)
  }

  const value = {
    food_list, addToCart, removeFromCart, cartItems, setCartItems, getTotalCartAmount, token, setToken, backendURL
  }

  return <StoreContext.Provider value={value}>
    {props.children}
  </StoreContext.Provider>
}

export default StoreContextProvider