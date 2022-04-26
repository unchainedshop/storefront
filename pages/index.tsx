import { useContext, useEffect, useState } from 'react';
import getConfig from 'next/config';
import { useIntl } from 'react-intl';

import CategoryListItem from '../modules/assortment/components/CategoryListItem';
import useAssortments from '../modules/assortment/hooks/useAssortments';
import LoadingItem from '../modules/common/components/LoadingItem';
import MetaTags from '../modules/common/components/MetaTags';
import Footer from '../modules/layout/components/Footer';
import Header from '../modules/layout/components/Header';
import ThemeContext from '../modules/common/ThemeContext';

const {
  publicRuntimeConfig: { theme },
} = getConfig();

const Home = () => {
  const { assortments, loading } = useAssortments();
  const [currentUrl, setcurrentUrl] = useState('');
  const intl = useIntl();

  const thm = useContext(ThemeContext);

  console.log(thm);

  useEffect(() => {
    setcurrentUrl(window.location.href);
  }, []);

  return (
    <>
      <MetaTags title={intl.formatMessage({ id: 'home' })} url={currentUrl} />
      <Header />
      <div className="container">
        <img
          className="d-block mx-auto mb-3"
          src={theme.assets.hero}
          alt="Hero"
        />

        {loading ? (
          <LoadingItem />
        ) : (
          <div className="row">
            {assortments.map((category) => (
              <CategoryListItem
                key={category._id}
                category={category}
                className="col-md-6 mx-auto mt-3"
              />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;
