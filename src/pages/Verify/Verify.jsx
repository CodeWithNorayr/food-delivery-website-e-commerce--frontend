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

  useEffect(() => {
    const verify = async () => {
      if (success && orderId) {
        try {
          const response = await axios.post(`${backendURL}/api/order/verify`, { success, orderId });
          if (response.data.success) {
            navigate('/userorders');
          } else {
            navigate('/');
          }
        } catch (error) {
          console.error(error);
          navigate('/');
        }
      } else {
        navigate('/');
      }
    };

    verify();
  }, [success, orderId, backendURL, navigate]);

  return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
