import { useIntl } from 'react-intl';

import Icon from '../../common/components/Icon';
import ProductListItem from './ProductListItem';

const ProductList = ({ products, totalProducts, onLoadMore }) => {
  const intl = useIntl();
  return (
    <div className="container">
      <div className="row">
        {products.map((product) => (
          <div key={product._id} className="col-sm-6">
            <div className="product-list-item d-flex flex-column h-100">
              <ProductListItem product={product} />
            </div>
          </div>
        ))}
      </div>
      {totalProducts > products?.length && (
        <div className="text-center py-4 align-align-items-center">
          <button
            aria-label={intl.formatMessage({ id: 'load_more' })}
            type="button"
            className="button button--secondary button--big"
            onClick={onLoadMore}
          >
            <Icon icon="navigation-arrows-down" className="mr-2" />
            {intl.formatMessage({ id: 'load_more' })}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
