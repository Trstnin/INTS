import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { UserDataContext } from '../contexts/userContext'
import Navbar from '../components/HomeComp/Navbar'
import CommunitiesSection from '../components/HomeComp/CommunitiesSection'
import PopupPreferenceName from '../components/Popup/PopupPreferenceName'


const Home = () => {
  const [showNamePopup, setShowNamePopup] = useState(false)
  const { user, setUser } = useContext(UserDataContext)
   
  useEffect(() => {
    const checkPreferenceName = async () => {
      if (user?._id) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/auth/preferenceName`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          );
          if (!response.data.preferenceName) {
            setShowNamePopup(true);
          }
        } catch (error) {
          console.error('Error checking preference name:', error);
        }
      }
    };
    checkPreferenceName();
  }, [user])

  return (
    <div className='bg-zinc-800 min-h-screen'>
      {showNamePopup && (
        <PopupPreferenceName setShowNamePopup={setShowNamePopup} setUser={setUser} />
      )}
      <Navbar />
      <CommunitiesSection />
    </div>
  )
}

export default Home