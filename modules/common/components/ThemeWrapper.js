import { useState } from 'react';
import ThemeContext from '../ThemeContext';
import theme from '../../../theme';

const ThemeWrapper = ({ children }) => {
  // eslint-disable-next-line no-unused-vars
  const [themeHook] = useState('light');

  // useEffect(() => {
  //   setIsDark(
  //     document.getElementsByTagName('html')[0].classList.contains('dark'),
  //   );
  // }, []);

  // const theme = isDark ? Theme.dark : Theme.light;

  return (
    <ThemeContext.Provider value={theme[themeHook]}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeWrapper;
