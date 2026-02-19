import React, { useContext, useEffect } from 'react';
import "./Verify.css";
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from "axios";
import { StoreContext } from '../../context/StoreContext';

const Verify = () => {
  const { backendURL } = useContext(StoreContext);
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      const response = await axios.post(`${backendURL}/api/order/verify`, { success, orderId }, {
      });
      if (response.data.success) {
        navigate('/');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error("Payment verification error:", error);
      navigate('/');
    }
  };

  useEffect(() => {
    const runVerification = async () => {
      if (success && orderId) {
        await verifyPayment();
      } else {
        navigate('/');
      }
    };

    runVerification();
  }, [success, orderId, navigate]); // include navigate to satisfy linter

  return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
