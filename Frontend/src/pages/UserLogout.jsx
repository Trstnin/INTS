import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom'

const UserLogout = () => {

 const navigate = useNavigate();
 const token = localStorage.getItem('token');

 axios.post(`${import.meta.env.VITE_BASE_URL}/auth/logout`, {
    headers : {
        Authorization: `Bearer ${token}`
    }
 }).then((response) => {
    if(response.status === 200){
        localStorage.removeItem('token');
        navigate('/signIn');
    }
 })



  return (
    <div>UserLogout</div>
  )
}

export default UserLogout