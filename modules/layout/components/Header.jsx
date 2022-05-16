import Link from 'next/link';
import Head from 'next/head';
import getConfig from 'next/config';
import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';

import LoginCart from '../../auth/components/LoginCart';
import SideCart from '../../cart/components/SideCart';
import { CartContext } from '../../cart/CartContext';
import DesktopNavigation from '../../assortment/components/DesktopNavigation';
import MobileNavigation from '../../assortment/components/MobileNavigation';
import Icon from '../../common/components/Icon';
import ThemeToggle from '../../common/components/ThemeToggle';

const {
  publicRuntimeConfig: { theme },
} = getConfig();

const Header = () => {
  const context = useContext(CartContext);
  const router = useRouter();
  const [isNavOpen, setNavOpenState] = useState(false);
  const { formatMessage } = useIntl();

  const setNavOpen = (isOpen) => {
    setNavOpenState(isOpen);
  };

  if (router?.events) {
    router.events.on('routeChangeStart', () => setNavOpen(false));
  }

  const topNavigationText = formatMessage({
    id: 'top_notification',
    defaultMessage: 'Top Notification',
  });

  const showTopNav =
    !topNavigationText || topNavigationText !== 'top_notification';

  return (
    <>
      {showTopNav && (
        <div className="bg-slate-900">
          <div className="container py-2 text-center font-bold text-white">
            <p className="my-0">{topNavigationText}</p>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-[1020] bg-white text-black opacity-80 dark:bg-slate-600 dark:text-white">
        <SideCart isOpen={context.isCartOpen} />
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={theme.assets['icon-180x180']}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href={theme.assets['icon-32x32']}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href={theme.assets['icon-16x16']}
          />
        </Head>
        <div className="container mx-auto hidden w-full sm:flex sm:flex-wrap sm:items-center sm:justify-between sm:py-2">
          <div className="flex items-center justify-start">
            <DesktopNavigation />
            <Link href="/">
              <a>
                <img
                  className="ml-4 self-center rounded"
                  width="140px"
                  src={theme.assets.logo}
                  alt="Shop logo"
                />
              </a>
            </Link>
          </div>
          <div className="ml-auto mr-4 flex">
            <LoginCart />
          </div>
          <ThemeToggle />
        </div>
        <div className="container">
          <div className="mobile-header flex items-center justify-between py-2 sm:hidden">
            <div className="flex items-center">
              <button
                type="button"
                aria-label="menu"
                className="no-button mr-4 flex items-center py-1"
                onClick={() => setNavOpen(true)}
              >
                <Icon icon="navigation-menu" className="h-5 w-5" />
              </button>

              <MobileNavigation
                isNavOpen={isNavOpen}
                doClose={() => setNavOpen(false)}
              />

              <Link href="/">
                <a>
                  <img width="100px" src={theme.assets.logo} alt="Shop logo" />
                </a>
              </Link>
            </div>
            <LoginCart />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
