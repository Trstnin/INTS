import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.post(
      `${import.meta.env.VITE_BASE_URL}/auth/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true, // If you're using cookies
      }
    )
      .then((response) => {
        if (response.status === 200) {
          localStorage.removeItem('token');
          toast.success('Logged out successfully');
          setTimeout(()=>{
            navigate('/signIn');
          },1500)
        }
      })
      .catch((err) => {
        console.error("Logout failed:", err);
        toast.error('Logout failed. Please try again.');
        localStorage.removeItem('token');
        setTimeout(()=>{
          navigate('/signIn');
        },1500)
        
      });
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default UserLogout;
