import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import CategoryListItem from '../../modules/assortment/components/CategoryListItem';
import useAssortments from '../../modules/assortment/hooks/useAssortments';
import LoadingItem from '../../modules/common/components/LoadingItem';
import MetaTags from '../../modules/common/components/MetaTags';
import Footer from '../../modules/layout/components/Footer';
import Header from '../../modules/layout/components/Header';

const Categories = () => {
  const { assortments, loading } = useAssortments();
  const [currentUrl, setCurrentUrl] = useState('');
  const { formatMessage } = useIntl();

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  return (
    <>
      <MetaTags
        title={formatMessage({
          id: 'product_categories',
          defaultMessage: 'Product Categories',
        })}
        url={currentUrl}
      />
      <Header />
      <main className="relative mx-auto w-full bg-white dark:bg-slate-600">
        {loading ? (
          <LoadingItem />
        ) : (
          <section aria-labelledby="favorites-heading">
            <div className="mx-10 max-w-full px-4 pt-16 sm:px-6 sm:pt-24 lg:px-8">
              <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-slate-100">
                {formatMessage({
                  id: 'shop',
                  defaultMessage: 'Shop by Collection',
                })}
              </h2>
              <p className="mt-4 text-base text-gray-500 dark:text-slate-400">
                {formatMessage({
                  id: 'shop_description',
                  defaultMessage:
                    'Each season, we collaborate with world-class designers to create a collection inspired by the natural world.',
                })}
              </p>
              <div className="mt-10 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16 lg:space-y-0">
                {assortments.map((category) => (
                  <CategoryListItem key={category._id} category={category} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Categories;
