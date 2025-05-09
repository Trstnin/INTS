import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const PopupLogout = ({ setShowLogoutPopup }) => {
  useEffect(() => {
    // Disable scrolling when popup is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleCancel = () => {
    document.body.style.overflow = 'unset';  // Re-enable scrolling
    setShowLogoutPopup(false);  // Hide the popup
  };

  return (
    <div className="fixed inset-0 z-[9999]">
      <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-[999] pointer-events-auto'>
      <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[200px] w-[400px] bg-zinc-700 rounded-2xl shadow-lg z-50'>
        <div className='p-5'>
          <h1 className='text-xl m-3 text-center text-white'>Do You really wanna logout?</h1>
          <div className='mt-2 p-6 flex justify-center gap-8'>
            <button 
              onClick={handleCancel}  // Changed from inline to named handler
              className='bg-blue-400 p-2 px-4 rounded-xl cursor-pointer hover:bg-blue-500'
            >
              Cancel
            </button>
            <Link 
             to={'/Logout'}
            className='bg-red-400 p-2 px-4 rounded-xl cursor-pointer hover:bg-red-500'>
              Logout
            </Link>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default PopupLogout