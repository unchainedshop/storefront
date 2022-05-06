import {
  BookmarkIcon,
  ShoppingCartIcon,
  TrashIcon,
} from '@heroicons/react/outline';
import { StarIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import useUser from '../modules/auth/hooks/useUser';
import useConditionalAddCartProduct from '../modules/cart/hooks/useConditionalAddCartProduct';
import LoadingItem from '../modules/common/components/LoadingItem';
import MetaTags from '../modules/common/components/MetaTags';
import useAddBookmark from '../modules/common/hooks/useAddBookmark';
import useRemoveBookmark from '../modules/common/hooks/useRemoveBookmark';
import getMediaUrl from '../modules/common/utils/getMediaUrl';
import Footer from '../modules/layout/components/Footer';
import Header from '../modules/layout/components/Header';

const bookmarks = () => {
  const { formatMessage } = useIntl();
  const { user, loading } = useUser();
  const { conditionalAddCartProduct } = useConditionalAddCartProduct();
  const { removeBookmark } = useRemoveBookmark();

  const totalUpVote = user?.bookmark?.product?.reviews?.reduce(
    (prev, next) => prev + next.upVote,
    0,
  );

  const totalDownVote = user?.bookmark?.product?.reviews?.reduce(
    (prev, next) => prev + next.downVote,
    0,
  );

  const averageVote = (totalUpVote / (totalUpVote + totalDownVote)) * 100;

  return (
    <>
      <MetaTags
        title={formatMessage({ id: 'bookmarks', defaultMessage: 'Bookmarks' })}
      />
      <Header />
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center">
          <div className="relative w-full px-4 md:max-w-2/3 md:flex-6 lg:max-w-3/4 lg:flex-7">
            {loading ? (
              <LoadingItem />
            ) : (
              <div className="mt-4 bg-white dark:bg-slate-600">
                <div className="mx-auto max-w-full overflow-hidden ">
                  <h2 className="sr-only">
                    {formatMessage({
                      id: 'bookmarks',
                      defaultMessage: 'Bookmarks',
                    })}
                  </h2>

                  <div className="-mx-px grid border-l border-gray-200 sm:mx-0 sm:grid-cols-3 lg:grid-cols-4">
                    {user?.bookmarks?.map((bookmark) => (
                      <div
                        key={bookmark?._id}
                        className="group relative border-y border-r border-gray-200 p-4 sm:p-6"
                      >
                        <div className="relative">
                          <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-slate-200 group-hover:opacity-75 dark:bg-slate-500">
                            {/* <img
                              src={product.imageSrc}
                              alt={product.imageAlt}
                              className="h-full w-full object-cover object-center"
                            /> */}
                            <Link
                              href={`/product/${bookmark.product?.texts?.slug}`}
                            >
                              <a className="">
                                <div className="h-full py-5 text-center">
                                  <Image
                                    loading="lazy"
                                    src={`${
                                      getMediaUrl(bookmark?.product) ||
                                      '/static/img/sun-glass-placeholder.jpeg'
                                    }`}
                                    alt={bookmark?.product?.texts?.title}
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
                            <span>
                              {bookmark.product?.simulatedPrice?.currency}
                            </span>
                            <span className="ml-1">
                              {bookmark?.product?.simulatedPrice?.amount}
                            </span>
                          </p>
                          <button
                            type="button"
                            className="absolute bottom-1 right-1 dark:text-white"
                            onClick={() =>
                              conditionalAddCartProduct({
                                productId: bookmark.product?._id,
                              })
                            }
                          >
                            <ShoppingCartIcon className="h-6 w-6" />
                          </button>
                          <button
                            type="button"
                            className="bg-white-500 absolute top-1 right-1 dark:text-white"
                            onClick={() =>
                              removeBookmark({
                                bookmarkId: bookmark?._id,
                              })
                            }
                          >
                            <TrashIcon className="h-6 w-6 text-red-400" />
                          </button>
                        </div>

                        <div className="pt-4 text-center">
                          <h3 className="text-sm font-medium text-slate-900 dark:text-white">
                            {bookmark?.product?.texts?.title}
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
                              {bookmark.product?.reviews.length}{' '}
                              {formatMessage({
                                id: 'reviews',
                                defaultMessage: 'reviews',
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default bookmarks;
