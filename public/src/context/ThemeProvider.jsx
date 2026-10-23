import React, { useState, useEffect } from 'react';
import { ThemeContext, THEMES } from './themeCore';

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('bhavyesh_portfolio_theme_v2');
      if (saved && ['light', 'dark', 'dusky', 'ambient', 'sand'].includes(saved)) {
        return saved;
      }
    } catch {
      // localStorage may fail in restricted environments
    }
    return 'light';
  });

  useEffect(() => {
    try {
      localStorage.setItem('bhavyesh_portfolio_theme_v2', theme);
    } catch {
      // ignore
    }
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleNext = () => {
    setTheme((curr) => {
      const order = ['light', 'dark', 'dusky', 'ambient', 'sand'];
      const nextIndex = (order.indexOf(curr) + 1) % order.length;
      return order[nextIndex];
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleNext, THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
};
