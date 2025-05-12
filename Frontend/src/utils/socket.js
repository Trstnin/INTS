import { useContext, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { UserDataContext } from '../contexts/userContext';

export const useSocket = () => {
  const { user } = useContext(UserDataContext);
  const socketRef = useRef(null);

  useEffect(() => {
    if (user?._id && !socketRef.current) {
      socketRef.current = io('http://localhost:3000', {
        query: { userId: user._id },
      });

      socketRef.current.on('connect', () => {
        console.log(`Socket connected with ID: ${socketRef.current.id}`);
      });

      socketRef.current.on('disconnect', () => {
        console.log('Socket disconnected');
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [user?._id]);

  return socketRef.current;
};
