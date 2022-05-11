/* eslint-disable react/no-danger */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';
import { useIntl } from 'react-intl';

import { MinusSmIcon, PlusSmIcon, StarIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import useProductDetail from '../../modules/products/hooks/useProductDetail';
import Header from '../../modules/layout/components/Header';
import Footer from '../../modules/layout/components/Footer';
import renderPrice from '../../modules/common/utils/renderPrice';
import LoadingItem from '../../modules/common/components/LoadingItem';
import MetaTags from '../../modules/common/components/MetaTags';
import getAssortmentPath from '../../modules/assortment/utils/getAssortmentPath';
import AssortmentBreadcrumbs from '../../modules/assortment/components/AssortmentBreadcrumbs';
import getMediaUrl from '../../modules/common/utils/getMediaUrl';
import getMediaUrls from '../../modules/common/utils/getMediaUrls';
import NotFound from '../404';
import ProductReview from '../../modules/products/components/ProductReview';
import useProductReviews from '../../modules/products/hooks/useProductReviews';
import ProductListItem from '../../modules/products/components/ProductListItem';
import { bgColor } from '../../modules/common/data/miscellaneous';
import useUpdateCartItem from '../../modules/cart/hooks/useUpdateCartItem';

const Detail = () => {
  const router = useRouter();
  const { formatMessage } = useIntl();
  const [currentUrl, setCurrentUrl] = useState('');
  const { product, paths, loading } = useProductDetail({
    slug: router.query.slug,
  });

  const { handleSubmit, register } = useForm();
  const { productReviews, loading: reviewLoading } = useProductReviews({
    productId: product?._id,
  });

  const { updateCartItem } = useUpdateCartItem();

  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(0);

  const onSubmit = (data) => {
    updateCartItem({ itemId: product?._id, quantity: data.quantity });
  };

  const productPath = getAssortmentPath(paths);
  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const totalUpVote = product?.reviews?.reduce(
    (prev, next) => prev + next.upVote,
    0,
  );

  const totalDownVote = product?.reviews?.reduce(
    (prev, next) => prev + next.downVote,
    0,
  );

  const averageVote = (totalUpVote / (totalUpVote + totalDownVote)) * 100;

  if (!product && !loading)
    return (
      <NotFound
        page={formatMessage({ id: 'products', defaultMessage: 'products' })}
      />
    );
  return (
    <>
      <MetaTags
        title={product?.texts?.title}
        imageUrl={getMediaUrl(product)}
        url={currentUrl}
        description={product?.texts?.description}
      />
      <Header />
      {loading ? (
        <LoadingItem />
      ) : (
        <main className="mx-auto mt-2 max-w-full px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
          <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
            <div className="max-w-full px-4 lg:col-span-12 lg:col-start-1">
              <AssortmentBreadcrumbs
                paths={productPath}
                currentAssortment={product?.texts}
              />
            </div>

            <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:mt-0">
              <ImageGallery
                lazyLoad
                onErrorImageURL="/static/img/sun-glass-placeholder.jpeg"
                useBrowserFullscreen
                items={getMediaUrls(product).map((image) => ({
                  original: image,
                  thumbnail: image,
                }))}
              />
            </div>

            <div className="lg:col-span-5 lg:col-start-8">
              <div className="flex justify-between">
                <h1
                  className="text-xl font-medium text-slate-900"
                  dangerouslySetInnerHTML={{ __html: product?.texts?.title }}
                />
                <p className="text-xl font-medium text-slate-900">
                  {renderPrice(product?.simulatedPrice)}
                </p>
              </div>
              <div>
                <h4
                  className="text-base font-normal text-slate-500"
                  dangerouslySetInnerHTML={{
                    __html: product?.texts?.subtitle,
                  }}
                />
              </div>

              {/* Reviews */}
              <div className="mt-4">
                <h2 className="sr-only">
                  {formatMessage({
                    id: 'reviews',
                    defaultMessage: 'Reviews',
                  })}
                </h2>
                <div className="flex items-center">
                  <p className="text-sm text-slate-700">
                    {averageVote}
                    <span className="sr-only">
                      {formatMessage({
                        id: 'reviews',
                        defaultMessage: ' out of 5 stars',
                      })}
                    </span>
                  </p>
                  <div className="ml-1 flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={`${
                          averageVote >= rating * 20
                            ? 'text-yellow-400'
                            : 'text-slate-200'
                        } h-5 w-5 flex-shrink-0`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <div
                    aria-hidden="true"
                    className="ml-4 text-sm text-slate-300"
                  >
                    ·
                  </div>
                  <div className="ml-4 flex">
                    <a
                      href="#"
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      {formatMessage({
                        id: 'all_reviews',
                        defaultMessage: `See all ${product?.reviews?.length} reviews`,
                      })}
                    </a>
                  </div>
                </div>
              </div>

              {/* Variations */}
              <div className="mt-8 lg:col-span-5">
                <form onSubmit={handleSubmit(onSubmit)}>
                  {product?.variations && (
                    <>
                      {/* Color picker */}
                      <div>
                        <h2 className="text-sm font-medium text-slate-900">
                          {formatMessage({
                            id: 'color',
                            defaultMessage: 'Color',
                          })}
                        </h2>

                        <fieldset className="mt-2">
                          <legend className="sr-only">
                            {formatMessage({
                              id: 'choose_color',
                              defaultMessage: 'Choose a color',
                            })}
                          </legend>
                          <div className="flex items-center gap-8">
                            {product?.variations[0]?.options?.map(
                              (option, index) => (
                                <label
                                  key={option?._id}
                                  className="relative block p-1 pl-5"
                                >
                                  <input
                                    type="radio"
                                    required
                                    name={product?.variations[0]?.key}
                                    ref={register}
                                    value={option?.value}
                                    onChange={() => setSelectedColor(index)}
                                    className="hidden"
                                  />
                                  <span
                                    className={classNames(
                                      bgColor(option?.value, 500),
                                      'absolute left-0 top-0 -mt-1 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-slate-200 text-base font-medium uppercase leading-none text-slate-900 ring-indigo-500 ring-offset-2 active:ring-indigo-500 active:ring-offset-2',
                                      {
                                        'border-transparent ring-indigo-500 ring-offset-2':
                                          selectedColor === index,
                                      },
                                    )}
                                  />
                                </label>
                              ),
                            )}
                          </div>
                        </fieldset>
                      </div>

                      {/* Size picker */}
                      <div className="mt-16">
                        <div className="flex items-center justify-between">
                          <h2 className="text-sm font-medium text-slate-900">
                            {formatMessage({
                              id: 'size',
                              defaultMessage: 'Size',
                            })}
                          </h2>
                          <a
                            href="#"
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            {formatMessage({
                              id: 'sizing_chart',
                              defaultMessage: 'See sizing chart',
                            })}
                          </a>
                        </div>

                        <fieldset
                          name={product?.variations[1]?.key}
                          className="mt-2"
                        >
                          <legend className="sr-only">
                            {formatMessage({
                              id: 'choose_size',
                              defaultMessage: 'Choose a size',
                            })}
                          </legend>
                          <div className="flex w-full gap-4">
                            {product?.variations[1]?.options?.map(
                              (option, index) => (
                                <label
                                  key={option?._id}
                                  className="relative block flex-auto p-1 pl-5"
                                >
                                  <input
                                    type="radio"
                                    value={option?.value}
                                    required
                                    ref={register}
                                    name={product?.variations[1]?.key}
                                    className="hidden"
                                    onChange={() => setSelectedSize(index)}
                                  />
                                  <span
                                    className={classNames(
                                      'absolute left-0 top-0 -mt-1 flex h-12 w-full items-center justify-center overflow-hidden rounded-md border border-slate-200 text-base font-medium uppercase leading-none text-slate-900 active:ring-indigo-500 active:ring-offset-2',
                                      {
                                        'border-transparent bg-indigo-600 text-white ring-indigo-500 ring-offset-2':
                                          selectedSize === index,
                                      },
                                    )}
                                  >
                                    {option?.value}
                                  </span>
                                </label>
                              ),
                            )}
                          </div>
                        </fieldset>
                      </div>
                    </>
                  )}

                  {/* Quantity */}
                  <div className="mt-16">
                    <div className="flex items-center justify-between">
                      <h2 className="text-sm font-medium text-slate-900">
                        {formatMessage({
                          id: 'quantity',
                          defaultMessage: 'Quantity',
                        })}
                      </h2>
                    </div>

                    <span className="relative z-0 mt-2 inline-flex gap-2 rounded-md shadow-sm">
                      <button
                        type="button"
                        className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        onClick={() => setQuantity(quantity - 1)}
                      >
                        <span className="sr-only">
                          {formatMessage({
                            id: 'minus',
                            defaultMessage: 'Minus',
                          })}
                        </span>
                        <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                      <div>
                        <label htmlFor="quantity" className="sr-only">
                          {formatMessage({
                            id: 'quantity',
                            defaultMessage: 'Quantity',
                          })}
                        </label>
                        <input
                          type="number"
                          name="quantity"
                          ref={register}
                          required
                          value={quantity}
                          onChange={(e) =>
                            setQuantity(parseInt(e.target.value, 10))
                          }
                          id="quantity"
                          className="block w-20 rounded-md border-gray-300 text-center shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="0"
                        />
                      </div>
                      <button
                        type="button"
                        className="relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        <span className="sr-only">
                          {formatMessage({
                            id: 'plus',
                            defaultMessage: 'Plus',
                          })}
                        </span>
                        <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    {formatMessage({
                      id: 'add_to_cart',
                      defaultMessage: 'Add to cart',
                    })}
                  </button>
                </form>

                {/* Product details */}
                <div className="mt-10">
                  <h2 className="text-sm font-medium text-slate-900">
                    {formatMessage({
                      id: 'description',
                      defaultMessage: 'Description',
                    })}
                  </h2>
                  <div
                    className="prose prose-sm mt-4 text-slate-500"
                    dangerouslySetInnerHTML={{
                      __html: product?.texts?.description,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Reviews */}
            {reviewLoading ? (
              <LoadingItem />
            ) : (
              <ProductReview
                reviews={productReviews}
                productId={product?._id}
              />
            )}

            {/* Bundle products */}
            {product?.bundleItems && (
              <section
                aria-labelledby="related-heading"
                className="mt-16 sm:mt-24 lg:col-span-12"
              >
                <h2
                  id="related-heading"
                  className="text-lg font-medium text-slate-900"
                >
                  {formatMessage({
                    id: 'customers_also_purchased',
                    defaultMessage: 'Customers also purchased',
                  })}
                </h2>

                <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                  {product?.bundleItems?.map((bundleItem) => (
                    <div
                      key={bundleItem?.product._id}
                      className="group relative"
                    >
                      <ProductListItem product={bundleItem?.product} />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </main>
      )}
      <Footer />
    </>
  );
};

export default Detail;
