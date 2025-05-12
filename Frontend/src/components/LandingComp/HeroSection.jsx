import React from 'react'
import { Link } from 'react-router-dom'

const HeroSection = () => {
  return (
    <div className='bg-[url("https://i.pinimg.com/736x/6c/3d/44/6c3d44c80e9226eea01377e62ea2fd9e.jpg")] bg-cover bg-center h-screen'>
         
    <div className="relative flex items-center justify-center h-full">
      <div className="flex flex-col items-center justify-center h-full align-center">
        <h1 className="text-[100px] font-bold text-white">
          Welcome to Into Startups
        </h1>
        <p className="mt-4 text-lg text-white">
          Your journey into the world of startups begins here.
        </p>
        <Link to={'/signIn'} className="mt-6 px-6 py-2 bg-green-500 text-black font-semibold rounded-2xl text-3xl hover:bg-blue-600">
          Explore
        </Link>
      </div>
    </div>
  </div>
  )
}

export default HeroSection