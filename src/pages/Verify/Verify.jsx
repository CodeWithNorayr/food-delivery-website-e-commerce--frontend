import React, { useContext, useEffect } from 'react';
import './Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import { toast } from 'react-toastify';

const Verify = () => {
  const { backendURL, token } = useContext(StoreContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Get query params
  const successParam = searchParams.get('success');
  const orderId = searchParams.get('orderId');

  // Convert string to boolean
  const success = successParam === 'true';

  const verifyPayment = async () => {
    try {
      const response = await axios.post(
        `${backendURL}/api/order/verify`,
        { success, orderId },
        {
          headers: token ? { token } : {}, // include token if available
        }
      );

      if (response.data.success) {
        toast.success('Payment verified successfully!');
        navigate('/userorders');
      } else {
        toast.error('Payment verification failed.');
        navigate('/');
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      toast.error('Server error during verification.');
      navigate('/');
    }
  };

  useEffect(() => {
    if (successParam && orderId) {
      verifyPayment();
    } else {
      navigate('/');
    }
  }, [successParam, orderId, navigate]);

  return (
    <div className="verify">
      <div className="spinner"></div>
      <p className="verify-text">Verifying your payment, please wait...</p>
    </div>
  );
};

export default Verify;
