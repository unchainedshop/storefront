import { ShoppingCartIcon } from '@heroicons/react/outline';
import { BookmarkIcon, StarIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useIntl } from 'react-intl';

import useUser from '../../auth/hooks/useUser';
import useConditionalAddCartProduct from '../../cart/hooks/useConditionalAddCartProduct';
import useAddBookmark from '../../common/hooks/useAddBookmark';
import useRemoveBookmark from '../../common/hooks/useRemoveBookmark';
import getMediaUrl from '../../common/utils/getMediaUrl';

const ProductListItem = ({ product }) => {
  const { formatMessage } = useIntl();
  const { conditionalAddCartProduct } = useConditionalAddCartProduct();
  const { addBookmark } = useAddBookmark();
  const { removeBookmark } = useRemoveBookmark();
  const { user } = useUser();

  const totalUpVote = product?.reviews?.reduce(
    (prev, next) => prev + next.upVote,
    0,
  );

  const totalDownVote = product?.reviews?.reduce(
    (prev, next) => prev + next.downVote,
    0,
  );

  const averageVote = (totalUpVote / (totalUpVote + totalDownVote)) * 100;

  const [filteredBookmark] =
    user?.bookmarks?.filter(
      (bookmark) => bookmark?.product?._id === product?._id,
    ) || [];

  return (
    <>
      <div className="relative">
        <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-slate-200 group-hover:opacity-75 dark:bg-slate-500">
          <Link href={`/product/${product?.texts?.slug}`}>
            <a className="">
              <div className="h-full py-5 text-center">
                <Image
                  loading="lazy"
                  src={`${
                    getMediaUrl(product) ||
                    '/static/img/sun-glass-placeholder.jpeg'
                  }`}
                  alt={product?.texts?.title}
                  width="500"
                  height="300"
                  quality={100}
                  layout="responsive"
                  objectFit="contain"
                />
              </div>
            </a>
          </Link>
        </div>
        <p className="absolute bottom-1 left-1 text-sm font-normal text-slate-900 dark:text-white">
          <span>{product?.simulatedPrice?.currency}</span>
          <span className="ml-1">{product?.simulatedPrice?.amount}</span>
        </p>

        {user && (
          <>
            <button
              type="button"
              className="absolute bottom-1 right-1 dark:text-white"
              onClick={() =>
                conditionalAddCartProduct({ productId: product?._id })
              }
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
                  : addBookmark({ productId: product?._id, userId: user?._id })
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
          </>
        )}
      </div>
      <div className="pt-4 text-center">
        <h3 className="text-sm font-medium text-slate-900 dark:text-white">
          {product?.texts?.title}
        </h3>
        <div className="mt-3 flex flex-col items-center">
          {/* <p className="sr-only">{averageVote} out of 5 stars</p> */}
          <div className="flex items-center">
            {[0, 1, 2, 3, 4].map((rating) => (
              <StarIcon
                key={rating}
                className={`
                        ${
                          averageVote >= rating * 20
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
            {formatMessage({ id: 'reviews', defaultMessage: 'reviews' })}
          </p>
        </div>
      </div>
    </>
  );
};

export default ProductListItem;
