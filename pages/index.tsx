import { useEffect, useState } from 'react';
import getConfig from 'next/config';
import { useIntl } from 'react-intl';

import Link from 'next/link';
import Image from 'next/image';
import classNames from 'classnames';
import { PhotographIcon } from '@heroicons/react/solid';
import useAssortments from '../modules/assortment/hooks/useAssortments';
import LoadingItem from '../modules/common/components/LoadingItem';
import MetaTags from '../modules/common/components/MetaTags';
import getMediaUrl from '../modules/common/utils/getMediaUrl';
import { catagories } from '../modules/common/data/miscellaneous';
import defaultNextImageLoader from '../modules/common/utils/getDefaultNextImageLoader';

const {
  publicRuntimeConfig: { theme },
} = getConfig();

const Home = () => {
  const { assortments, loading } = useAssortments();
  const [currentUrl, setCurrentUrl] = useState('');
  const { formatMessage } = useIntl();

  useEffect(() => {
    setCurrentUrl(window.location.href);

    return () => {
      setCurrentUrl('');
    };
  }, []);

  return (
    <>
      <MetaTags
        title={formatMessage({ id: 'home', defaultMessage: 'Home' })}
        url={currentUrl}
      />
      <div className="w-full bg-white px-4 dark:bg-slate-600 sm:px-0">
        <div className="relative h-[442px] w-full">
          <Image
            src={theme.assets.hero}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            quality={100}
            placeholder="blur"
            blurDataURL="/placeholder.png"
            className="mx-auto mb-4 block rounded-lg"
            alt={formatMessage({ id: 'hero', defaultMessage: 'Hero' })}
            loader={defaultNextImageLoader}
          />
        </div>

        {loading ? (
          <LoadingItem />
        ) : (
          assortments.length !== 0 && (
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

                <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6 lg:gap-8">
                  {assortments?.slice(0, 5)?.map((assortment, index) => (
                    <div
                      key={assortment?._id}
                      className={classNames(
                        'group aspect-w-2 aspect-h-1 relative overflow-hidden rounded-lg',
                        {
                          'sm:aspect-w-1 sm:aspect-h-1 sm:row-span-2':
                            catagories[index]?.row === 2,
                        },
                      )}
                    >
                      {getMediaUrl(assortment?.media) ? (
                        <Image
                          src={getMediaUrl(assortment?.media)}
                          alt={
                            assortment.texts.description ||
                            assortment.texts.title
                          }
                          layout="fill"
                          objectFit="cover"
                          objectPosition="center"
                          placeholder="blur"
                          blurDataURL="/placeholder-product.png"
                          className={classNames(
                            'object-cover object-center group-hover:opacity-75',
                            {
                              'sm:absolute sm:inset-0 sm:h-full sm:w-full':
                                catagories[index]?.hasClass,
                            },
                          )}
                          loader={defaultNextImageLoader}
                        />
                      ) : (
                        <div>
                          <PhotographIcon className="absolute inset-0 h-full w-full text-slate-200  dark:text-slate-500" />
                        </div>
                      )}
                      <div
                        aria-hidden="true"
                        className="bg-gradient-to-b from-transparent to-black opacity-50"
                      />
                      <div className="flex items-end p-6">
                        <div>
                          <h3 className="font-semibold text-white">
                            <Link href={`shop/${assortment?.texts?.slug}`}>
                              <a>
                                <span className="absolute inset-0" />
                                {assortment?.texts?.title}
                              </a>
                            </Link>
                          </h3>
                          <p
                            aria-hidden="true"
                            className="mt-1 text-sm text-white"
                          >
                            {assortment?.texts?.subtitle}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
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
          )
        )}
      </div>
    </>
  );
};

export default Home;
