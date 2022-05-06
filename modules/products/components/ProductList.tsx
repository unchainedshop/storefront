import { useIntl } from 'react-intl';
import { ChevronDoubleDownIcon } from '@heroicons/react/solid';

import ProductListItem from './ProductListItem';
import Button from '../../common/components/Button';

const ProductList = ({ products, totalProducts, onLoadMore }) => {
  const { formatMessage } = useIntl();

  return (
    <div className="mt-4 bg-white dark:bg-slate-600">
      <div className="mx-auto max-w-full overflow-hidden ">
        <h2 className="sr-only">
          {formatMessage({ id: 'products', defaultMessage: 'Products' })}
        </h2>

        <div className="-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product?._id}
              className="group relative border-y border-r border-gray-200 p-4 sm:p-6"
            >
              <ProductListItem product={product} />
            </div>
          ))}
        </div>
        {totalProducts > products?.length && (
          <div className="items-center py-6 text-center">
            <Button
              text={
                <>
                  <ChevronDoubleDownIcon className="mr-2 h-6 w-6" />
                  {formatMessage({
                    id: 'load_more',
                    defaultMessage: 'Load More',
                  })}
                </>
              }
              aria-label={formatMessage({
                id: 'load_more',
                defaultMessage: 'Load More',
              })}
              type="button"
              className="dark:text-white"
              onClick={onLoadMore}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
