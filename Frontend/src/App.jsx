import React from 'react'
import Landing from './pages/Landing'
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <>
       <Routes>
        <Route path='/' element={<Landing />}></Route>
        <Route path='/Login' element={<Login />}></Route>
       </Routes>
    </>
  )
}

export default App