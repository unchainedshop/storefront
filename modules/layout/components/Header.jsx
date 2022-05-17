import Link from 'next/link';
import Head from 'next/head';
import getConfig from 'next/config';
import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';

import { MenuIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import LoginCart from '../../auth/components/LoginCart';
import SideCart from '../../cart/components/SideCart';
import { CartContext } from '../../cart/CartContext';
import DesktopNavigation from '../../assortment/components/DesktopNavigation';
import MobileNavigation from '../../assortment/components/MobileNavigation';
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
              <a className="relative ml-4 h-10 w-36 rounded">
                <Image
                  src={theme.assets.logo}
                  alt={formatMessage({
                    id: 'shop_logo',
                    defaultMessage: 'Shop logo',
                  })}
                  layout="fill"
                  placeholder="blur"
                  blurDataURL=""
                  className="rounded"
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
          <div className="flex items-center justify-between px-4 py-2 sm:hidden">
            <div className="flex items-center">
              <button
                type="button"
                aria-label="menu"
                className="mr-4 flex cursor-pointer appearance-none items-center border-0 bg-transparent p-0 py-1 text-left text-inherit"
                onClick={() => setNavOpen(true)}
              >
                <MenuIcon className="h-6 w-6 text-slate-900 dark:text-slate-100" />
              </button>

              <MobileNavigation
                isNavOpen={isNavOpen}
                doClose={() => setNavOpen(false)}
              />

              <Link href="/">
                <a className="relative h-7 w-24 rounded">
                  <Image
                    src={theme.assets.logo}
                    alt={formatMessage({
                      id: 'shop_logo_mobile',
                      defaultMessage: 'Shop logo',
                    })}
                    layout="fill"
                    placeholder="blur"
                    blurDataURL=""
                    className="rounded"
                  />
                </a>
              </Link>
            </div>
            <div className="ml-auto mr-3 flex">
              <LoginCart />
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
