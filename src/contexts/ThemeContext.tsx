import React, { createContext, useContext, useEffect } from 'react';

interface ThemeContextType {
  isDark: true;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <ThemeContext.Provider value={{ isDark: true }}>
      {children}
    </ThemeContext.Provider>
  );
};