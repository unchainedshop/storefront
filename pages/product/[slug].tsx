/* eslint-disable react/no-danger */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';
import { useIntl } from 'react-intl';

import { RadioGroup } from '@headlessui/react';
import { CurrencyDollarIcon, GlobeIcon } from '@heroicons/react/outline';
import { MinusSmIcon, PlusSmIcon, StarIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import useProductDetail from '../../modules/products/hooks/useProductDetail';
import Header from '../../modules/layout/components/Header';
import Footer from '../../modules/layout/components/Footer';
import AddToCartButton from '../../modules/cart/components/AddToCartButton';
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

const productt = {
  name: 'Basic Tee',
  price: '$35',
  href: '#',
  breadcrumbs: [
    { id: 1, name: 'Women', href: '#' },
    { id: 2, name: 'Clothing', href: '#' },
  ],
  images: [
    {
      id: 1,
      imageSrc:
        'https://tailwindui.com/img/ecommerce-images/product-page-01-featured-product-shot.jpg',
      imageAlt: "Back of women's Basic Tee in black.",
      primary: true,
    },
    {
      id: 2,
      imageSrc:
        'https://tailwindui.com/img/ecommerce-images/product-page-01-product-shot-01.jpg',
      imageAlt: "Side profile of women's Basic Tee in black.",
      primary: false,
    },
    {
      id: 3,
      imageSrc:
        'https://tailwindui.com/img/ecommerce-images/product-page-01-product-shot-02.jpg',
      imageAlt: "Front of women's Basic Tee in black.",
      primary: false,
    },
  ],
  colors: [
    { name: 'Black', bgColor: 'bg-slate-900', selectedColor: 'ring-slate-900' },
    {
      name: 'Heather Grey',
      bgColor: 'bg-slate-400',
      selectedColor: 'ring-slate-400',
    },
  ],
  sizes: [
    { name: 'XXS', inStock: true },
    { name: 'XS', inStock: true },
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
    { name: 'XL', inStock: false },
  ],
  description: `
    <p>The Basic tee is an honest new take on a classic. The tee uses super soft, pre-shrunk cotton for true comfort and a dependable fit. They are hand cut and sewn locally, with a special dye technique that gives each tee it's own look.</p>
    <p>Looking to stock your closet? The Basic tee also comes in a 3-pack or 5-pack at a bundle discount.</p>
  `,
  details: [
    'Only the best materials',
    'Ethically and locally made',
    'Pre-washed and pre-shrunk',
    'Machine wash cold with similar colors',
  ],
};
const reviewss = [
  {
    id: 1,
    rating: 5,
    content: `
      <p>This icon pack is just what I need for my latest project. There's an icon for just about anything I could ever need. Love the playful look!</p>
    `,
    date: 'July 16, 2021',
    datetime: '2021-07-16',
    author: 'Emily Selman',
    avatarSrc:
      'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
  },
  {
    id: 2,
    rating: 5,
    content: `
      <p>Blown away by how polished this icon pack is. Everything looks so consistent and each SVG is optimized out of the box so I can use it directly with confidence. It would take me several hours to create a single icon this good, so it's a steal at this price.</p>
    `,
    date: 'July 12, 2021',
    datetime: '2021-07-12',
    author: 'Hector Gibbons',
    avatarSrc:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
  },
  // More reviews...
];

const relatedProducts = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg',
    imageAlt: "Front of men's Basic Tee in white.",
    price: '$35',
    color: 'Aspen White',
  },
  // More products...
];

const Detail = () => {
  const router = useRouter();
  const { formatMessage } = useIntl();
  const [currentUrl, setCurrentUrl] = useState('');
  const { product, paths, loading } = useProductDetail({
    slug: router.query.slug,
  });

  const { productReviews, loading: reviewLoading } = useProductReviews({
    productId: product?._id,
  });

  console.log(productReviews);

  const [open, setOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(productt.colors[0]);
  const [selectedSize, setSelectedSize] = useState(productt.sizes[2]);

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

              <div className="mt-8 lg:col-span-5">
                <form>
                  {/* Color picker */}
                  <div>
                    <h2 className="text-sm font-medium text-slate-900">
                      Color
                    </h2>

                    <RadioGroup
                      value={selectedColor}
                      onChange={setSelectedColor}
                      className="mt-2"
                    >
                      <RadioGroup.Label className="sr-only">
                        Choose a color
                      </RadioGroup.Label>
                      <div className="flex items-center space-x-3">
                        {productt.colors.map((color) => (
                          <RadioGroup.Option
                            key={color.name}
                            value={color}
                            className={({ active, checked }) =>
                              classNames(
                                'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none',
                                {
                                  'ring ring-offset-1': active && checked,
                                  'ring-2': !active && checked,
                                },
                                color.selectedColor,
                              )
                            }
                          >
                            <RadioGroup.Label as="p" className="sr-only">
                              {color.name}
                            </RadioGroup.Label>
                            <span
                              aria-hidden="true"
                              className={classNames(
                                color.bgColor,
                                'h-8 w-8 rounded-full border border-black border-opacity-10',
                              )}
                            />
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Size picker */}
                  <div className="mt-8">
                    <div className="flex items-center justify-between">
                      <h2 className="text-sm font-medium text-slate-900">
                        Size
                      </h2>
                      <a
                        href="#"
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        See sizing chart
                      </a>
                    </div>

                    <RadioGroup
                      value={selectedSize}
                      onChange={setSelectedSize}
                      className="mt-2"
                    >
                      <RadioGroup.Label className="sr-only">
                        Choose a size
                      </RadioGroup.Label>
                      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                        {productt.sizes.map((size) => (
                          <RadioGroup.Option
                            key={size.name}
                            value={size}
                            className={({ active, checked }) =>
                              classNames(
                                'flex items-center justify-center rounded-md border py-3 px-3 text-sm font-medium uppercase sm:flex-1',
                                {
                                  'ring-2 ring-indigo-500 ring-offset-2':
                                    active,
                                  'cursor-pointer focus:outline-none':
                                    size.inStock,
                                  'cursor-not-allowed opacity-25':
                                    !size.inStock,
                                  'border-transparent bg-indigo-600 text-white hover:bg-indigo-700':
                                    checked,
                                  'border-slate-200 bg-white text-slate-900 hover:bg-slate-50':
                                    !checked,
                                },
                              )
                            }
                            disabled={!size.inStock}
                          >
                            <RadioGroup.Label as="p">
                              {size.name}
                            </RadioGroup.Label>
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Quantity */}
                  <div className="mt-8">
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
                          id="quantity"
                          className="block w-20 rounded-md border-gray-300 text-center shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="0"
                        />
                      </div>
                      <button
                        type="button"
                        className="relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
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

              {/* <AddToCartButton productId={product?._id} /> */}
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

            {/* Related products */}
            <section
              aria-labelledby="related-heading"
              className="mt-16 sm:mt-24 lg:col-span-12"
            >
              <h2
                id="related-heading"
                className="text-lg font-medium text-slate-900"
              >
                Customers also purchased
              </h2>

              <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {relatedProducts.map((relatedProduct) => (
                  <div key={relatedProduct.id} className="group relative">
                    <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md group-hover:opacity-75 lg:aspect-none lg:h-80">
                      <img
                        src={relatedProduct.imageSrc}
                        alt={relatedProduct.imageAlt}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      />
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-sm text-slate-700">
                          <a href={relatedProduct.href}>
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            />
                            {relatedProduct.name}
                          </a>
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                          {relatedProduct.color}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-slate-900">
                        {relatedProduct.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      )}
      <Footer />
    </>
  );
};

export default Detail;
