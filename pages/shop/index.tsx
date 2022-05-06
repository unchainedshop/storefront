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
      <div className="container mt-4">
        {loading ? (
          <LoadingItem />
        ) : (
          <div className="px4 flex flex-wrap">
            {assortments.map((category) => (
              <CategoryListItem
                key={category._id}
                category={category}
                className="col-md-6 col-lg-4"
              />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Categories;
