import React, { useContext, useState } from 'react'
import { UserDataContext } from '../../contexts/userContext'
import { GiRegeneration } from "react-icons/gi"
import { GiCelebrationFire } from "react-icons/gi"
import axios from 'axios'

const PopupPreferenceName = ({ setShowNamePopup, setUser }) => {
  const { user } = useContext(UserDataContext)
  const [showGenerateName, setShowGenerateName] = useState(false)
  const [generatedName, setGeneratedName] = useState('John Snow')

  const savePreferenceName = async (name) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/auth/preferenceName`,
        { preferenceName: name },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      setShowNamePopup(false)
    } catch (error) {
      console.error('Error saving preference name:', error)
    }
  }

  const handleNoThanks = () => {
    savePreferenceName(user.FirstName)
  }

  const handleYesLetsGo = () => {
    setShowGenerateName(true)
  }

  const handleRegenerateName = () => {
    // You can replace this with an actual random name generator or fetch from backend
    const names = ["PixelPhantom", "CodeNinja", "QuantumFox", "NightWalker", "EchoRider"]
    const randomName = names[Math.floor(Math.random() * names.length)]
    setGeneratedName(randomName)
  }

  const handleFinish = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/preference-name`,
        { preferenceName: generatedName },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.status === 201) {
        // Update user context with new preference name
        setUser(prev => ({
          ...prev,
          preferenceName: generatedName
        }));
        setShowNamePopup(false);
      }
    } catch (error) {
      console.error('Error saving preference name:', error);
    }
  };

  return (
    <>
      {!showGenerateName ? (
        <div className='fixed inset-0 z-[9999]'>
          <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-[999] pointer-events-auto'>
            <div className='fixed top-40 left-1/2 transform -translate-x-1/2 translate-y-1/2 h-[200px] w-[400px] bg-zinc-700 rounded-2xl shadow-lg z-50'>
              <div className='p-5'>
                <h1 className='text-xl m-3 text-center text-white'>
                  Hey {user.FirstName}, do you want us to give you a creative anonymous name?
                </h1>
                <div className='p-5 flex justify-center gap-8'>
                  <button
                    className='bg-red-400 p-1 px-4 rounded-xl cursor-pointer hover:bg-red-500'
                    onClick={handleNoThanks}
                  >
                    No, I'm good
                  </button>
                  <button
                    className='bg-blue-400 px-4 rounded-xl cursor-pointer hover:bg-blue-500'
                    onClick={handleYesLetsGo}
                  >
                    Yaa, let's have fun
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='fixed inset-0 z-[9999]'>
          <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-[999] pointer-events-auto'>
            <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[200px] w-[400px] bg-zinc-700 rounded-2xl shadow-lg z-50'>
              <div className='p-5'>
                <h1 className='text-xl m-1 text-center text-white'>Here is your name:</h1>
                <div className='p-6 flex justify-center'>
                  <input
                    type="text"
                    className='bg-white p-2 rounded-xl border-none outline-none text-zinc-950 text-center'
                    value={generatedName}
                    readOnly
                  />
                </div>
                <div className='flex justify-evenly'>
                  <button
                    className='bg-blue-400 p-2 px-4 rounded-xl cursor-pointer flex hover:bg-blue-500'
                    onClick={handleRegenerateName}
                  >
                    <h1 className='text-zinc-900'>Re-Generate</h1>
                    <GiRegeneration className='text-black ml-2 text-2xl' />
                  </button>
                  <button
                    className='bg-green-400 flex p-2 px-4 rounded-xl cursor-pointer hover:bg-green-500'
                    onClick={handleFinish}
                  >
                    <h1 className='text-zinc-900'>Let's Gooo</h1>
                    <GiCelebrationFire className='text-black ml-2 text-2xl' />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PopupPreferenceName
