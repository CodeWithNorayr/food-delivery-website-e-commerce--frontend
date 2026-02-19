import React, { useContext, useState } from 'react';
import './Order.css';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import { toast } from 'react-toastify';

const Order = () => {
  const { getTotalCartAmount, food_list, cartItems, token, backendURL } = useContext(StoreContext);

  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    streetcode: '',
    zipcode: '',
    state: '',
    city: '',
    country: '',
    phone: ''
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const orderItems = food_list
      .filter(item => cartItems[item._id] > 0)
      .map(item => ({ ...item, quantity: cartItems[item._id] }));

    const orderData = {
      address: data,
      items: orderItems,
      amount: Number(getTotalCartAmount()) + 2 // Ensure numeric addition
    };

    try {
      const response = await axios.post(`${backendURL}/api/order/place`, orderData, { headers: { token } });
      if (response.data.success) {
        window.location.replace(response.data.session_url);
      } else {
        toast.error("An error occurred while placing your order.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Network or server error. Please try again.");
    }
  };

  return (
    <form className="order-container" onSubmit={onSubmitHandler}>
      <div className="order-title">
        <h1>THIS IS ONE OF THE BEST ONLINE FOOD DELIVERY PLATFORMS, ENJOY!</h1>
      </div>

      {/* Input Fields */}
      {[
        { label: 'First Name', name: 'firstname', type: 'text', placeholder: 'Enter your first name ...' },
        { label: 'Last Name', name: 'lastname', type: 'text', placeholder: 'Enter your last name ...' },
        { label: 'Email', name: 'email', type: 'email', placeholder: 'Enter your email @ ...' },
        { label: 'Street Code', name: 'streetcode', type: 'text', placeholder: 'Enter your street code ...' },
        { label: 'Zip Code', name: 'zipcode', type: 'text', placeholder: 'Enter your zip code ...' },
        { label: 'State', name: 'state', type: 'text', placeholder: 'Enter your state ...' },
        { label: 'City', name: 'city', type: 'text', placeholder: 'Enter your city ...' },
        { label: 'Country', name: 'country', type: 'text', placeholder: 'Enter your country ...' },
        { label: 'Phone number', name: 'phone', type: 'text', placeholder: 'Enter your phone number ...' }
      ].map((field) => (
        <div className={field.name} key={field.name}>
          <p className={`${field.name}-tag`}>{field.label}</p>
          <input
            onChange={onChangeHandler}
            className={`${field.name}-input`}
            name={field.name}
            value={data[field.name]}
            type={field.type}
            placeholder={field.placeholder}
            required
          />
        </div>
      ))}

      {/* Pricing Summary */}
      <div className="order-price">
        <h1 className="order-price-tag">Total Cart Price</h1>
        <p className="order-price-p-tag">{getTotalCartAmount()}</p>
      </div>
      <div className="order-fee">
        <h1 className="order-price-tag">Delivery Fee</h1>
        <p className="order-price-p-tag">2</p>
      </div>
      <div className="order-charge">
        <h1 className="order-price-tag">Total Charge</h1>
        <p className="order-price-p-tag">{Number(getTotalCartAmount()) + 2}</p>
      </div>

      {/* Submit Button */}
      <div className="btn-submit">
        {token ? (
          <button className="btn-submit" type="submit">Submit</button>
        ) : (
          <button
            className="btn-submit"
            type="button"
            onClick={() => toast.warn("Sign Up to make an order")}
          >
            Sign Up to make an order
          </button>
        )}
      </div>
    </form>
  );
};

export default Order;
