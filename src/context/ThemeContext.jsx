import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext({
  theme: 'white',
  isLightBlue: false,
  toggleTheme: () => {},
  setTheme: () => {}
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('tcet_theme_mode');
      return saved === 'light-blue' ? 'light-blue' : 'white';
    } catch {
      return 'white';
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light-blue') {
      root.classList.add('light-blue-mode');
      root.setAttribute('data-theme', 'light-blue');
    } else {
      root.classList.remove('light-blue-mode');
      root.setAttribute('data-theme', 'white');
    }

    try {
      localStorage.setItem('tcet_theme_mode', theme);
    } catch (e) {
      console.warn('Unable to persist theme to localStorage:', e);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'white' ? 'light-blue' : 'white'));
  };

  const isLightBlue = theme === 'light-blue';

  return (
    <ThemeContext.Provider value={{ theme, isLightBlue, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
