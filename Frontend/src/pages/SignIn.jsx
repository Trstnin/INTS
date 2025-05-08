import React, { useState } from "react";
import Headerforlogin from "../components/Headersforlogin";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = () => {

  
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    acceptTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      Email: formData.email,
      Password: formData.password,
    };

   try {
     const response = await axios.post(
       `${import.meta.env.VITE_BASE_URL}/auth/login`,
       userData
     );
 
     if (response.status == 200) {
       const data = response.data;
       localStorage.setItem("token", data.token);
       toast.success("Login Successfully !!!");
       setTimeout(() => {
        navigate("/Home");
       }, 1500);
     }
   } catch (err) {
    console.log(err)
    //  window.location.reload()
     toast.error("Login failed. Please check your credentials");
   }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[url('https://i.pinimg.com/736x/6c/3d/44/6c3d44c80e9226eea01377e62ea2fd9e.jpg')] bg-cover bg-center">
      <Headerforlogin />

      <div className="flex-grow flex items-center justify-center py-12">
        <div className="w-full max-w-[85rem] px-4">
          <div className="max-w-lg mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="lg:max-w-lg lg:mx-auto lg:me-0 ms-auto">
                <div className="p-4 sm:p-7 flex flex-col bg-zinc-300 rounded-2xl shadow-lg">
                  <div className="text-center">
                    <h1 className="block text-2xl font-bold text-gray-800">
                      Sign In to Your Account
                    </h1>
                  </div>

                  <div className="mt-5">
                    <button
                      onClick={() =>
                        (window.location.href = `${
                          import.meta.env.VITE_BASE_URL
                        }/auth/google`)
                      }
                      type="button"
                      className="w-full py-3 px-4 inline-flex cursor-pointer justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50"
                    >
                      <svg
                        className="w-4 h-auto"
                        width="46"
                        height="47"
                        viewBox="0 0 46 47"
                        fill="none"
                      >
                        <path
                          d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z"
                          fill="#4285F4"
                        ></path>
                        <path
                          d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z"
                          fill="#34A853"
                        ></path>
                        <path
                          d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z"
                          fill="#FBBC05"
                        ></path>
                        <path
                          d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z"
                          fill="#EB4335"
                        ></path>
                      </svg>
                      Sign in with Google
                    </button>

                    <div className="mt-2">
                      <p className="text-sm text-gray-400 ml-10 mt-4">
                        Don't have an account?{" "}
                        <Link to="/Login" className="text-blue-400">
                          Sign Up here
                        </Link>
                      </p>
                    </div>

                    <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6">
                      Or
                    </div>

                    <div className="space-y-4">
                      <div className="relative">
                        <input
                          type="email"
                          required
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="peer p-3 block w-full border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Email"
                        />
                      </div>

                      <div className="relative">
                        <input
                          type="password"
                          required
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="peer p-3 block w-full border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Password"
                        />
                      </div>

                      <div className="flex items-center">
                        <input
                          id="remember-me"
                          name="acceptTerms"
                          type="checkbox"
                          checked={formData.acceptTerms}
                          onChange={handleChange}
                          required
                          className="shrink-0 mt-0.5 border-gray-200 rounded-sm text-blue-600"
                        />
                        <label htmlFor="remember-me" className="ml-3 text-sm">
                          I accept the{" "}
                          <a href="#" className="text-blue-600 hover:underline">
                            Terms and Conditions
                          </a>
                        </label>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 px-4 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                      >
                        Sign In
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

   <ToastContainer />

      <footer className="py-4 mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default SignIn;
