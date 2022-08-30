import { ShoppingCartIcon } from '@heroicons/react/outline';
import { BookmarkIcon, PhotographIcon, StarIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useIntl } from 'react-intl';

import useUser from '../../auth/hooks/useUser';
import useConditionalAddCartProduct from '../../cart/hooks/useConditionalAddCartProduct';
import useConditionalBookmarkProduct from '../../cart/hooks/useConditionalBookmarkProduct';

import useRemoveBookmark from '../../common/hooks/useRemoveBookmark';
import defaultNextImageLoader from '../../common/utils/getDefaultNextImageLoader';
import getMediaUrl from '../../common/utils/getMediaUrl';
import renderPrice from '../../common/utils/renderPrice';
import calculateProductRating from '../utils/calculateProductRating';

const ProductListItem = ({ product }) => {
  const { formatMessage } = useIntl();
  const { conditionalAddCartProduct } = useConditionalAddCartProduct();
  const { conditionalBookmarkProduct } = useConditionalBookmarkProduct();
  const { removeBookmark } = useRemoveBookmark();

  const { user } = useUser();

  const averageVote = calculateProductRating(product?.reviews);

  const [filteredBookmark] =
    user?.bookmarks?.filter(
      (bookmark) => bookmark?.product?._id === product?._id,
    ) || [];

  return (
    <>
      <div className="relative">
        <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg  text-slate-200 group-hover:opacity-75 dark:bg-slate-500">
          <Link href={`/product/${product?.texts?.slug}`}>
            <a className="">
              <div className="h-full py-5 text-center">
                {getMediaUrl(product) ? (
                  <Image
                    src={getMediaUrl(product)}
                    alt={product?.texts?.title}
                    layout="fill"
                    placeholder="blur"
                    blurDataURL="placeholder.png"
                    objectFit="cover"
                    className="h-full w-full"
                    loader={defaultNextImageLoader}
                  />
                ) : (
                  <div className="relative h-full w-full">
                    <PhotographIcon className="absolute inset-0 h-full w-full  dark:text-slate-500" />
                  </div>
                )}
              </div>
            </a>
          </Link>
        </div>
        <p className="absolute bottom-1 left-1 text-sm font-normal text-slate-900 dark:text-white">
          <span className="ml-1">{renderPrice(product?.simulatedPrice)}</span>
        </p>

        <button
          type="button"
          className="absolute bottom-1 right-1 dark:text-white"
          onClick={() => conditionalAddCartProduct({ productId: product?._id })}
        >
          <ShoppingCartIcon className="h-6 w-6" />
        </button>

        <button
          type="button"
          className="bg-white-500 absolute top-1 right-1 dark:text-white"
          onClick={() =>
            filteredBookmark
              ? removeBookmark({
                  bookmarkId: filteredBookmark?._id,
                })
              : conditionalBookmarkProduct({
                  productId: product?._id,
                })
          }
        >
          <BookmarkIcon
            className={classNames(
              'h-6 w-6 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300',
              {
                'text-purple-600 hover:text-purple-700 dark:text-yellow-500 dark:hover:text-yellow-700':
                  user?.bookmarks
                    ?.map((bookmark) => bookmark?.product?._id)
                    .includes(product?._id),
              },
            )}
          />
        </button>
      </div>
      <div className="pt-4 text-center">
        <h3 className="text-sm font-medium text-slate-900 dark:text-white">
          {product?.texts?.title}
        </h3>
        <div className="mt-3 flex flex-col items-center">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((rating) => (
              <StarIcon
                key={rating}
                className={`
                        ${
                          averageVote >= rating
                            ? 'text-yellow-400'
                            : 'text-slate-400'
                        }
                        h-5 w-5 flex-shrink-0
                      `}
                aria-hidden="true"
              />
            ))}
          </div>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {product?.reviews?.length}{' '}
            {formatMessage({ id: 'reviews', defaultMessage: 'Reviews' })}
          </p>
        </div>
      </div>
    </>
  );
};

export default ProductListItem;
