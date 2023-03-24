import { useEffect } from 'react';
import getConfig from 'next/config';
import { useIntl } from 'react-intl';

import Link from 'next/link';
import Image from 'next/legacy/image';
import useAssortments from '../modules/assortment/hooks/useAssortments';
import LoadingItem from '../modules/common/components/LoadingItem';
import MetaTags from '../modules/common/components/MetaTags';
import defaultNextImageLoader from '../modules/common/utils/defaultNextImageLoader';
import CategoryListItem from '../modules/assortment/components/CategoryListItem';

const {
  publicRuntimeConfig: { theme },
} = getConfig();

const Home = () => {
  const { assortments, loading } = useAssortments();
  const { formatMessage } = useIntl();

  return (
    <>
      <MetaTags title={formatMessage({ id: 'home', defaultMessage: 'Home' })} />
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
                  <Link
                    href="/shop"
                    className="hidden text-sm font-semibold text-fuchsia-600 hover:text-fuchsia-500 sm:block"
                  >
                    {formatMessage({
                      id: 'browse_all_category',
                      defaultMessage: 'Browse all categories',
                    })}
                    <span aria-hidden="true"> &rarr;</span>
                  </Link>
                </div>

                <div className="mt-6 sm:hidden">
                  <Link
                    href="/shop"
                    className="block text-sm font-semibold text-fuchsia-600 hover:text-fuchsia-500"
                  >
                    {formatMessage({
                      id: 'browse_all_category_mobile',
                      defaultMessage: 'Browse all categories',
                    })}
                    <span aria-hidden="true"> &rarr;</span>
                  </Link>
                </div>
              </div>
              <div className="mt-10 space-y-12 divide-gray-200 lg:grid lg:grid-cols-3 lg:gap-x-5  lg:space-y-0">
                {assortments.map((assortment) => (
                  <CategoryListItem
                    key={assortment._id}
                    category={assortment}
                  />
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default Home;
