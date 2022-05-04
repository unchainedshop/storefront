import { MoonIcon, SunIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.getElementsByTagName('html')[0].classList.add('dark');
      setIsDark(true);
    } else {
      document.getElementsByTagName('html')[0].classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.getElementsByTagName('html')[0].classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.getElementsByTagName('html')[0].classList.remove('dark');
      localStorage.theme = 'light';
    }
  }, [theme]);

  const handleToggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
      setIsDark(false);
    } else {
      setTheme('dark');
      setIsDark(true);
    }
  };

  return (
    <div className="mr-2 flex items-center">
      <button
        type="button"
        className="hover:cursor-pointer"
        id="theme-toggle"
        title="Toggles light & dark"
        aria-label="auto"
        aria-live="polite"
        onClick={handleToggleTheme}
      >
        <SunIcon
          className={classNames(
            'h-8 w-8 text-black transition-all delay-1000 ease-out',
            {
              hidden: isDark,
            },
          )}
        />
        <MoonIcon
          className={classNames(
            'h-8 w-8 text-white transition-all delay-1000 ease-out',
            {
              hidden: !isDark,
            },
          )}
        />
      </button>
    </div>
  );
};

export default ThemeToggle;
