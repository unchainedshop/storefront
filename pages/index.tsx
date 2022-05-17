import { useEffect, useState } from 'react';
import getConfig from 'next/config';
import { useIntl } from 'react-intl';

import Link from 'next/link';
import Image from 'next/image';
import useAssortments from '../modules/assortment/hooks/useAssortments';
import LoadingItem from '../modules/common/components/LoadingItem';
import MetaTags from '../modules/common/components/MetaTags';
import Footer from '../modules/layout/components/Footer';
import Header from '../modules/layout/components/Header';
import getMediaUrl from '../modules/common/utils/getMediaUrl';

const {
  publicRuntimeConfig: { theme },
} = getConfig();

const Home = () => {
  const { assortments, loading } = useAssortments();
  const [currentUrl, setCurrentUrl] = useState('');
  const { formatMessage } = useIntl();

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  return (
    <>
      <MetaTags title={formatMessage({ id: 'home' })} url={currentUrl} />
      <Header />
      <main className="container relative mx-auto w-full bg-white px-4 dark:bg-slate-600 sm:px-0">
        <img
          className="mx-auto mb-4 block rounded-lg"
          src={theme.assets.hero}
          alt={formatMessage({ id: 'hero', defaultMessage: 'Hero' })}
        />

        {loading ? (
          <LoadingItem />
        ) : (
          <div>
            <div className="mx-auto max-w-full pt-16 sm:pt-20">
              <div className="sm:flex sm:items-baseline sm:justify-between">
                <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-slate-100">
                  {formatMessage({
                    id: 'shop_by_category',
                    defaultMessage: 'Shop by Category',
                  })}
                </h2>
                <Link href="/shop">
                  <a className="hidden text-sm font-semibold text-fuchsia-600 hover:text-fuchsia-500 sm:block">
                    {formatMessage({
                      id: 'browse_all_category',
                      defaultMessage: 'Browse all categories',
                    })}
                    <span aria-hidden="true"> &rarr;</span>
                  </a>
                </Link>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-3 sm:gap-x-6 lg:gap-8">
                <div className="group aspect-w-2 aspect-h-1 relative overflow-hidden rounded-lg sm:aspect-h-1 sm:aspect-w-1 sm:row-span-2">
                  <Image
                    src={
                      getMediaUrl(assortments[0]?.media) ||
                      'https://tailwindui.com/img/ecommerce-images/home-page-03-featured-category.jpg'
                    }
                    alt={
                      assortments[0]?.texts.description ||
                      assortments[0]?.texts.title
                    }
                    layout="fill"
                    objectFit="contain"
                    objectPosition="center"
                    placeholder="blur"
                    blurDataURL=""
                  />
                  <div
                    aria-hidden="true"
                    className="bg-gradient-to-b from-transparent to-black opacity-50"
                  />
                  <div className="flex items-end p-6">
                    <div>
                      <h3 className="font-semibold text-white">
                        <Link href={`shop/${assortments[1]?.texts?.slug}`}>
                          <a>
                            <span className="absolute inset-0" />
                            {assortments[0]?.texts?.title}
                          </a>
                        </Link>
                      </h3>
                      <p aria-hidden="true" className="mt-1 text-sm text-white">
                        {assortments[0]?.texts?.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="group aspect-w-2 aspect-h-1 relative overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full">
                  <Image
                    src={
                      getMediaUrl(assortments[1]?.media) ||
                      'https://tailwindui.com/img/ecommerce-images/home-page-03-category-01.jpg'
                    }
                    alt={
                      assortments[1]?.texts.description ||
                      assortments[1]?.texts.title
                    }
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    placeholder="blur"
                    blurDataURL=""
                    className="group-hover:opacity-75 sm:absolute sm:inset-0 sm:h-full sm:w-full"
                  />
                  <div
                    aria-hidden="true"
                    className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
                  />
                  <div className="flex items-end p-6 sm:absolute sm:inset-0">
                    <div>
                      <h3 className="font-semibold text-white">
                        <Link href={`shop/${assortments[1]?.texts?.slug}`}>
                          <a>
                            <span className="absolute inset-0" />
                            {assortments[1]?.texts?.title}
                          </a>
                        </Link>
                      </h3>
                      <p aria-hidden="true" className="mt-1 text-sm text-white">
                        {assortments[1]?.texts?.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="group aspect-w-2 aspect-h-1 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full">
                  <Image
                    src={
                      getMediaUrl(assortments[2]?.media) ||
                      ' https://tailwindui.com/img/ecommerce-images/home-page-03-category-02.jpg'
                    }
                    alt={
                      assortments[2]?.texts.description ||
                      assortments[2]?.texts.title
                    }
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    className="group-hover:opacity-75 sm:absolute sm:inset-0 sm:h-full sm:w-full"
                  />
                  <div
                    aria-hidden="true"
                    className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
                  />
                  <div className="flex items-end p-6 sm:absolute sm:inset-0">
                    <div>
                      <h3 className="font-semibold text-white">
                        <Link href={`shop/${assortments[2]?.texts?.slug}`}>
                          <a>
                            <span className="absolute inset-0" />
                            {assortments[2]?.texts?.title}
                          </a>
                        </Link>
                      </h3>
                      <p aria-hidden="true" className="mt-1 text-sm text-white">
                        {assortments[2]?.texts?.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="group aspect-w-2 aspect-h-1 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full">
                  <Image
                    src={
                      getMediaUrl(assortments[3]?.media) ||
                      ' https://tailwindui.com/img/ecommerce-images/home-page-03-category-02.jpg'
                    }
                    alt={
                      assortments[3]?.texts?.description ||
                      assortments[3]?.texts?.title
                    }
                    layout="fill"
                    placeholder="blur"
                    blurDataURL=""
                    objectFit="contain"
                    objectPosition="center"
                    className="object-cover object-center group-hover:opacity-75 sm:absolute sm:inset-0 sm:h-full sm:w-full"
                  />
                  <div
                    aria-hidden="true"
                    className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
                  />
                  <div className="flex items-end p-6 sm:absolute sm:inset-0">
                    <div>
                      <h3 className="font-semibold text-white">
                        <Link href={`shop/${assortments[3]?.texts?.slug}`}>
                          <a>
                            <span className="absolute inset-0" />
                            {assortments[3]?.texts?.title}
                          </a>
                        </Link>
                      </h3>
                      <p aria-hidden="true" className="mt-1 text-sm text-white">
                        {assortments[3]?.texts?.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="group aspect-w-2 aspect-h-1 relative overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full">
                  <Image
                    src={
                      getMediaUrl(assortments[4]?.media) ||
                      'https://tailwindui.com/img/ecommerce-images/home-page-03-category-02.jpg'
                    }
                    alt={
                      assortments[4]?.texts.description ||
                      assortments[4]?.texts.title
                    }
                    layout="fill"
                    placeholder="blur"
                    blurDataURL=""
                    objectFit="cover"
                    objectPosition="center"
                    className="group-hover:opacity-75 sm:absolute sm:inset-0 sm:h-full sm:w-full"
                  />
                  <div
                    aria-hidden="true"
                    className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
                  />
                  <div className="flex items-end p-6 sm:absolute sm:inset-0">
                    <div>
                      <h3 className="font-semibold text-white">
                        <Link href={`shop/${assortments[4]?.texts?.slug}`}>
                          <a>
                            <span className="absolute inset-0" />
                            {assortments[4]?.texts?.title}
                          </a>
                        </Link>
                      </h3>
                      <p aria-hidden="true" className="mt-1 text-sm text-white">
                        {assortments[4]?.texts?.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 sm:hidden">
                <Link href="/shop">
                  <a className="block text-sm font-semibold text-fuchsia-600 hover:text-fuchsia-500">
                    {formatMessage({
                      id: 'browse_all_category_mobile',
                      defaultMessage: 'Browse all categories',
                    })}
                    <span aria-hidden="true"> &rarr;</span>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Home;
