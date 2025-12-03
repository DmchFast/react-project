import { useState, useCallback } from 'react';

function useNotification() {
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    type: 'info', // 'success', 'error', 'warning', 'info'
    duration: 6000,
  });

  const showNotification = useCallback((message, type = 'info', duration = 6000) => {
    setNotification({
      open: true,
      message,
      type,
      duration,
    });
  }, []);

  const hideNotification = useCallback(() => {
    setNotification(prev => ({ ...prev, open: false }));
  }, []);

  return {
    notification,
    showNotification,
    hideNotification,
  };
}

export default useNotification;