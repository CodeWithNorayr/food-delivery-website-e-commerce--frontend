import React, { useEffect, useState, useContext } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const { token, backendURL } = useContext(StoreContext);

  // ✅ Fetch Orders Function
  const fetchMyOrders = async () => {
    if (!token) return;

    try {
      setLoading(true);

      const response = await axios.post(
        `${backendURL}/api/order/userorders`,
        {},
        {
          headers: {
            token: token, // ✅ send token like backend expects
          },
        }
      );      

      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (error) {
      console.error("Fetch Orders Error:", error);
      toast.error("Server error while fetching orders");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch when token is ready
  useEffect(() => {
    if (token) {
      fetchMyOrders();
    }
  }, [token]);

  // ✅ Loading State
  if (loading) {
    return <p className="loading-text">Loading your orders...</p>;
  }

  // ✅ Empty Orders State
  if (!loading && orders.length === 0) {
    return <p className="empty-text">No orders found.</p>;
  }

  return (
    <div className="my-orders">
      <h2 className="my-orders-h2">My Orders</h2>
      {orders.map((order) => (
        <div key={order._id} className="order-card">
          <div>
            <p>
            {order.address.firstname} 
            {order.address.lastname} with this email address 
            {order.address.email} is making the order. The client has these several details
            <br />streetcode:{order.address.streetcode},
            <br />zipcode:{order.address.zipcode},
            <br />state:{order.address.state},
            <br />city:{order.address.city},
            <br />country:{order.address.country},
            <br />phone:{order.address.phone}
            </p>

          </div>
          {/* ✅ Items Section */}
          <div className="order-items">
            {order.items?.map((item, index) => (
              <div key={index} className="order-item">
                <p className="order-items-name">
                  <strong>Name:</strong> {item.name}
                </p>
                <p className="order-items-price">
                  <strong>Price:</strong> {item.price}
                </p>
                <p className="order-items-category">
                  <strong>Category:</strong> {item.category}
                </p>
                <p className="order-items-description">
                  <strong>Description:</strong> {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* ✅ Order Info Section */}
          <div className="order-info">
            <p className="order-info-status">
              <strong>Status:</strong> {order.status}
            </p>
            <p className="order-info-total-amount">
              <strong>Total Amount:</strong> {order.amount}
            </p>
          </div>
          <hr/>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
