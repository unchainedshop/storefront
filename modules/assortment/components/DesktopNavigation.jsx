import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { useIntl } from 'react-intl';

import { MenuIcon } from '@heroicons/react/solid';
import DesktopNavigationContext from './DesktopNavigationContext';
import MegaDropdown from './MegaDropdown';
import useCategoriesTree from '../hooks/useCategoriesTree';

const arrayEqual = (a, b) =>
  a.length === b.length &&
  a.reduce((acc, curr, index) => acc && curr === b[index], true);

const DesktopNavigation = () => {
  const { formatMessage } = useIntl();
  const [hoverPath, setHoverPath] = useState([]);
  const [isTouching, setTouching] = useState(false);

  const { assortmentTree } = useCategoriesTree({ root: 'shop' });

  const handleClick = (node) => (event) => {
    if (isTouching && node.children) {
      // Special behavior for touch devices: A tab opens the dropdown and the click (=navigation) is prevented
      event.preventDefault();
      if (hoverPath.length > 0 && arrayEqual(node.path, hoverPath)) {
        // This is the second tab on a top-navigation title: It closes the dropdown
        setHoverPath([]);
      } else {
        // This is the first tab on a top-navigation title: It opens the dropdown
        setHoverPath(node.path);
      }
    } else {
      // Default: Hover path is resetted and the user navigates because it was a click on a link
      setHoverPath([]);
    }
  };

  const handleTouchStart = () => {
    setTouching(true);
  };

  const handleTouchEnd = () => {
    setTimeout(() => setTouching(false), 300);
  };

  const ref = useRef(null);
  const dataInHoverPath = ref?.current?.getAttribute('data-in-hover-path');

  return (
    <DesktopNavigationContext.Provider
      value={{
        setHoverPath,
        hoverPath,
        isTouching,
      }}
    >
      <nav
        className="hidden sm:flex"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div key="shop" className="inline-block">
          <Link href="/shop">
            <a
              className="nav--main__item flex items-center py-4"
              data-in-hover-path={hoverPath.includes(assortmentTree.slug)}
              ref={ref}
              onMouseEnter={() => {
                if (!isTouching) {
                  setHoverPath(assortmentTree.slug);
                }
              }}
              onMouseOut={() => {
                setHoverPath([]);
              }}
              onBlur={() => {
                if (!isTouching) setHoverPath([]);
              }}
              onClick={handleClick(assortmentTree)}
            >
              <MenuIcon className="mr-2 h-6 w-6 text-slate-900 dark:text-slate-100" />
              {formatMessage({ id: 'menu', defaultMessage: 'Menu' })}
            </a>
          </Link>
          {hoverPath.includes(assortmentTree.slug) && (
            <MegaDropdown
              {...assortmentTree}
              dataInHoverPath={dataInHoverPath}
            />
          )}
        </div>
      </nav>
    </DesktopNavigationContext.Provider>
  );
};

export default DesktopNavigation;
