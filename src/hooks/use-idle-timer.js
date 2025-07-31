import { useDispatch } from 'react-redux';
import { useRef, useEffect, useCallback } from 'react';

import { logout } from '../actions/authActions'; // Replace with your actual logout action

const useIdleTimer = (timeout = 300000) => { // Default timeout of 5 minutes
  const dispatch = useDispatch();
  const timerRef = useRef(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      dispatch(logout());
    }, timeout);
  }, [dispatch, timeout]);

  useEffect(() => {
    const handleActivity = () => {
      resetTimer();
    };

    // Events for both desktop and mobile devices
    const events = [
      'mousemove', // Desktop mouse movement
      'keydown', // Desktop keyboard input
      'scroll', // Scrolling (common on both desktop and mobile)
      'touchstart', // Touch event for mobile
      'touchmove', // Touch move for mobile
    ];

    events.forEach(event => {
      window.addEventListener(event, handleActivity);
    });

    // Initial timer setup
    resetTimer();

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [resetTimer]);
};

export default useIdleTimer;
