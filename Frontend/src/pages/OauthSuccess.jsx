import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OauthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      setTimeout(() => {
        navigate("/Home"); // redirect to dashboard/home
      }, 200);
    } else {
      navigate("/Login"); // fallback
    }
  }, [navigate]);

  return <p>Logging you in with Google...</p>;
};

export default OauthSuccess;
