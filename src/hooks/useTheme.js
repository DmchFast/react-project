import { useState, useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

function useTheme() {
  const [storedTheme, setStoredTheme] = useLocalStorage('app-theme', 'light');
  const [currentTheme, setCurrentTheme] = useState(storedTheme);

  useEffect(() => {
    // Инициализируем тему при загрузке
    document.body.setAttribute('data-theme', currentTheme);
    setStoredTheme(currentTheme);
  }, [currentTheme, setStoredTheme]);

  const toggleTheme = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setCurrentTheme(newTheme);
    document.body.setAttribute('data-theme', newTheme);
  };

  return {
    theme: currentTheme,
    toggleTheme,
    isDark: currentTheme === 'dark',
  };
}

export default useTheme;