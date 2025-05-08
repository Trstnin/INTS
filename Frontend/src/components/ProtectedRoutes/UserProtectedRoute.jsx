import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../../contexts/userContext";
import axios from "axios";

const UserProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    const token = localStorage.getItem("token"); // move this line inside useEffect
    if (!token) {
      navigate("/signIn");
      return;
    }
  
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/auth/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (response.status === 201) {
          setUser(response.data.user);
          setIsLoading(false);
        }
      } catch (error) {
        console.log("profile fetch error:", error);
        localStorage.removeItem("token");
        navigate("/signIn");
      }
    };
  
    fetchUserProfile();
  }, [navigate, setUser]); // removed `token` from dependencies
  

  if(isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>
};

export default UserProtectedRoute;
