import { useEffect, useState } from 'react';
import getConfig from 'next/config';
import { useIntl } from 'react-intl';

import CategoryListItem from '../modules/assortment/components/CategoryListItem';
import useAssortments from '../modules/assortment/hooks/useAssortments';
import LoadingItem from '../modules/common/components/LoadingItem';
import MetaTags from '../modules/common/components/MetaTags';
import Footer from '../modules/layout/components/Footer';
import Header from '../modules/layout/components/Header';

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
      <main className="container relative mx-auto w-full bg-white dark:bg-slate-600 sm:px-0">
        <img
          className="mx-auto mb-4 block"
          src={theme.assets.hero}
          alt={formatMessage({ id: 'hero', defaultMessage: 'Hero' })}
        />

        {loading ? (
          <LoadingItem />
        ) : (
          <section aria-labelledby="favorites-heading">
            <div className="mx-auto max-w-7xl py-4 px-4 sm:py-32 sm:px-6 lg:px-8">
              <div className="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-3 sm:gap-y-0 sm:gap-x-6 lg:gap-x-8">
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

export default Home;
