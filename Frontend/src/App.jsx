import React from "react";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import OauthSuccess from "./pages/OauthSuccess";
import UserProtectedRoute from "./components/ProtectedRoutes/UserProtectedRoute";
import UserLogout from "./pages/UserLogout";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/signIn" element={<SignIn />}></Route>

        <Route path="/oauth-success" element={<OauthSuccess />} />
        <Route
          path="/Logout"
          element={
            <UserProtectedRoute>
              <UserLogout />
            </UserProtectedRoute>
          }
        ></Route>

        <Route
          path="/Home"
          element={
            <UserProtectedRoute>
              <Home />
            </UserProtectedRoute>
          }
        ></Route>
      </Routes>
    </>
  );
};

export default App;
