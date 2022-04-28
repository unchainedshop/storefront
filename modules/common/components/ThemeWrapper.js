import { useState } from 'react';
import ThemeContext from '../ThemeContext';
import theme from '../../../theme';
import ThemeToggle from './ThemeToggle';

const ThemeWrapper = ({ children }) => {
  const [themeMode, setThemeMode] = useState('light');

  return (
    <ThemeContext.Provider value={[theme[themeMode], setThemeMode]}>
      <ThemeToggle />
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeWrapper;
