import React from 'react'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import SignIn from './pages/SignIn'
import OauthSuccess from "./pages/OauthSuccess";

const App = () => {
  return (
    <>
       <Routes>
        <Route path='/' element={<Landing />}></Route>
        <Route path='/Login' element={<Login />}></Route>
        <Route path='/signIn' element={<SignIn/>}></Route>
        <Route path='/Home' element={<Home />}></Route>
        <Route path="/oauth-success" element={<OauthSuccess />} />
       </Routes>
    </>
  )
}

export default App