import React from "react";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import OauthSuccess from "./pages/OauthSuccess";
import UserProtectedRoute from "./components/ProtectedRoutes/UserProtectedRoute";
import UserLogout from "./pages/UserLogout";
import Chat from "./pages/Chat";
import ChatDefault from "./pages/ChatDefault";

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

        <Route
          path="/Chat/:startupName"
          element={
            <UserProtectedRoute>
              <Chat />
            </UserProtectedRoute>
          }
        ></Route>
        <Route
          path="/Chat"
          element={
            <UserProtectedRoute>
              <ChatDefault />
            </UserProtectedRoute>
          }
        ></Route>

        {/* 404 fallback */}
        <Route
          path="*"
          element={
            <h1 className="text-center text-white">404 - Page Not Found</h1>
          }
        />
      </Routes>
    </>
  );
};

export default App;
