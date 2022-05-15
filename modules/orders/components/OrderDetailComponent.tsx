import Image from 'next/image';
import { useIntl } from 'react-intl';

import Link from 'next/link';
import { PaperClipIcon } from '@heroicons/react/solid';
import renderPrice from '../../common/utils/renderPrice';
import ListItem from '../../common/components/ListItem';
import getMediaUrl from '../../common/utils/getMediaUrl';
import useFormatDateTime from '../../common/utils/useFormatDateTime';
import defaultNextImageLoader from '../../common/utils/getDefaultNextImageLoader';
import useUser from '../../auth/hooks/useUser';

const products = [
  {
    id: 1,
    name: 'Nomad Tumbler',
    description:
      'This durable and portable insulated tumbler will keep your beverage at the perfect temperature during your next adventure.',
    href: '#',
    price: '35.00',
    status: 'Preparing to ship',
    step: 1,
    date: 'March 24, 2021',
    datetime: '2021-03-24',
    address: ['Floyd Miles', '7363 Cynthia Pass', 'Toronto, ON N3Y 4H8'],
    email: 'f•••@example.com',
    phone: '1•••••••••40',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/confirmation-page-03-product-01.jpg',
    imageAlt: 'Insulated bottle with white base and black snap lid.',
  },
  {
    id: 2,
    name: 'Minimalist Wristwatch',
    description:
      'This contemporary wristwatch has a clean, minimalist look and high quality components.',
    href: '#',
    price: '149.00',
    status: 'Shipped',
    step: 0,
    date: 'March 23, 2021',
    datetime: '2021-03-23',
    address: ['Floyd Miles', '7363 Cynthia Pass', 'Toronto, ON N3Y 4H8'],
    email: 'f•••@example.com',
    phone: '1•••••••••40',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/confirmation-page-03-product-02.jpg',
    imageAlt:
      'Arm modeling wristwatch with black leather band, white watch face, thin watch hands, and fine time markings.',
  },
  // More products...
];

function getFlagEmoji(countryCode) {
  const codePoints = countryCode
    ?.toUpperCase()
    ?.split('')
    ?.map((char) => 127397 + char?.charCodeAt());
  return String.fromCodePoint(...(codePoints || []));
}

const paymentProvider = {
  CARD: {
    visa: {
      text: 'visa',
      icon: (
        <svg
          aria-hidden="true"
          width={36}
          height={24}
          viewBox="0 0 36 24"
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-auto"
        >
          <rect width={36} height={24} rx={4} fill="#224DBA" />
          <path
            d="M10.925 15.673H8.874l-1.538-6c-.073-.276-.228-.52-.456-.635A6.575 6.575 0 005 8.403v-.231h3.304c.456 0 .798.347.855.75l.798 4.328 2.05-5.078h1.994l-3.076 7.5zm4.216 0h-1.937L14.8 8.172h1.937l-1.595 7.5zm4.101-5.422c.057-.404.399-.635.798-.635a3.54 3.54 0 011.88.346l.342-1.615A4.808 4.808 0 0020.496 8c-1.88 0-3.248 1.039-3.248 2.481 0 1.097.969 1.673 1.653 2.02.74.346 1.025.577.968.923 0 .519-.57.75-1.139.75a4.795 4.795 0 01-1.994-.462l-.342 1.616a5.48 5.48 0 002.108.404c2.108.057 3.418-.981 3.418-2.539 0-1.962-2.678-2.077-2.678-2.942zm9.457 5.422L27.16 8.172h-1.652a.858.858 0 00-.798.577l-2.848 6.924h1.994l.398-1.096h2.45l.228 1.096h1.766zm-2.905-5.482l.57 2.827h-1.596l1.026-2.827z"
            fill="#fff"
          />
        </svg>
      ),
    },
    mastercard: {
      text: 'mastercard',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          width="48px"
          height="48px"
        >
          <path
            fill="#3F51B5"
            d="M45,35c0,2.209-1.791,4-4,4H7c-2.209,0-4-1.791-4-4V13c0-2.209,1.791-4,4-4h34c2.209,0,4,1.791,4,4V35z"
          />
          <path
            fill="#FFC107"
            d="M30 14A10 10 0 1 0 30 34A10 10 0 1 0 30 14Z"
          />
          <path
            fill="#FF3D00"
            d="M22.014,30c-0.464-0.617-0.863-1.284-1.176-2h5.325c0.278-0.636,0.496-1.304,0.637-2h-6.598C20.07,25.354,20,24.686,20,24h7c0-0.686-0.07-1.354-0.201-2h-6.598c0.142-0.696,0.359-1.364,0.637-2h5.325c-0.313-0.716-0.711-1.383-1.176-2h-2.973c0.437-0.58,0.93-1.122,1.481-1.595C21.747,14.909,19.481,14,17,14c-5.523,0-10,4.477-10,10s4.477,10,10,10c3.269,0,6.162-1.575,7.986-4H22.014z"
          />
        </svg>
      ),
    },
  },
  INVOICE: {},
  GENERIC: {
    ETH: {
      text: 'ethereum',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          // xmlns:xlink="http://www.w3.org/1999/xlink"
          // xmlns:xodm="http://www.corel.com/coreldraw/odm/2003"
          xmlSpace="preserve"
          width="24"
          height="24"
          version="1.1"
          shapeRendering="geometricPrecision"
          textRendering="geometricPrecision"
          imageRendering="optimizeQuality"
          fillRule="evenodd"
          clipRule="evenodd"
          viewBox="0 0 784.37 1277.39"
        >
          <g id="Layer_x0020_1">
            <metadata id="CorelCorpID_0Corel-Layer" />
            <g id="_1421394342400">
              <g>
                <polygon
                  fill="#343434"
                  fillRule="nonzero"
                  points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54 "
                />
                <polygon
                  fill="#8C8C8C"
                  fillRule="nonzero"
                  points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33 "
                />
                <polygon
                  fill="#3C3C3B"
                  fillRule="nonzero"
                  points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89 "
                />
                <polygon
                  fill="#8C8C8C"
                  fillRule="nonzero"
                  points="392.07,1277.38 392.07,956.52 -0,724.89 "
                />
                <polygon
                  fill="#141414"
                  fillRule="nonzero"
                  points="392.07,882.29 784.13,650.54 392.07,472.33 "
                />
                <polygon
                  fill="#393939"
                  fillRule="nonzero"
                  points="0,650.54 392.07,882.29 392.07,472.33 "
                />
              </g>
            </g>
          </g>
        </svg>
      ),
    },
    BTC: {
      text: 'bitcoin',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          // xmlns:xlink="http://www.w3.org/1999/xlink"
          // xmlns:xodm="http://www.corel.com/coreldraw/odm/2003"
          xmlSpace="preserve"
          width="100%"
          height="100%"
          version="1.1"
          shapeRendering="geometricPrecision"
          textRendering="geometricPrecision"
          imageRendering="optimizeQuality"
          fillRule="evenodd"
          clipRule="evenodd"
          viewBox="0 0 4091.27 4091.73"
        >
          <g id="Layer_x0020_1">
            <metadata id="CorelCorpID_0Corel-Layer" />
            <g id="_1421344023328">
              <path
                fill="#F7931A"
                fillRule="nonzero"
                d="M4030.06 2540.77c-273.24,1096.01 -1383.32,1763.02 -2479.46,1489.71 -1095.68,-273.24 -1762.69,-1383.39 -1489.33,-2479.31 273.12,-1096.13 1383.2,-1763.19 2479,-1489.95 1096.06,273.24 1763.03,1383.51 1489.76,2479.57l0.02 -0.02z"
              />
              <path
                fill="white"
                fillRule="nonzero"
                d="M2947.77 1754.38c40.72,-272.26 -166.56,-418.61 -450,-516.24l91.95 -368.8 -224.5 -55.94 -89.51 359.09c-59.02,-14.72 -119.63,-28.59 -179.87,-42.34l90.16 -361.46 -224.36 -55.94 -92 368.68c-48.84,-11.12 -96.81,-22.11 -143.35,-33.69l0.26 -1.16 -309.59 -77.31 -59.72 239.78c0,0 166.56,38.18 163.05,40.53 90.91,22.69 107.35,82.87 104.62,130.57l-104.74 420.15c6.26,1.59 14.38,3.89 23.34,7.49 -7.49,-1.86 -15.46,-3.89 -23.73,-5.87l-146.81 588.57c-11.11,27.62 -39.31,69.07 -102.87,53.33 2.25,3.26 -163.17,-40.72 -163.17,-40.72l-111.46 256.98 292.15 72.83c54.35,13.63 107.61,27.89 160.06,41.3l-92.9 373.03 224.24 55.94 92 -369.07c61.26,16.63 120.71,31.97 178.91,46.43l-91.69 367.33 224.51 55.94 92.89 -372.33c382.82,72.45 670.67,43.24 791.83,-303.02 97.63,-278.78 -4.86,-439.58 -206.26,-544.44 146.69,-33.83 257.18,-130.31 286.64,-329.61l-0.07 -0.05zm-512.93 719.26c-69.38,278.78 -538.76,128.08 -690.94,90.29l123.28 -494.2c152.17,37.99 640.17,113.17 567.67,403.91zm69.43 -723.3c-63.29,253.58 -453.96,124.75 -580.69,93.16l111.77 -448.21c126.73,31.59 534.85,90.55 468.94,355.05l-0.02 0z"
              />
            </g>
          </g>
        </svg>
      ),
    },
  },
};

const OrderDetailComponent = ({ order }) => {
  const { formatMessage } = useIntl();
  const { formatDateTime } = useFormatDateTime();

  const { user } = useUser();

  return (
    <div className="bg-slate-50 dark:bg-slate-600">
      <div className="mx-auto max-w-full pt-16 sm:py-24 sm:px-6 lg:max-w-full lg:px-8">
        <div className="space-y-2 px-4 sm:flex sm:items-baseline sm:justify-between sm:space-y-0 sm:px-0">
          <div className="flex sm:items-baseline sm:space-x-4">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
              {formatMessage({
                id: 'order_num',
                defaultMessage: `Order #`,
              })}
              <span>{order?.orderNumber}</span>
            </h1>
            <Link href="#">
              <a className="hidden text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-sky-500 dark:hover:text-sky-400 sm:block">
                {formatMessage({
                  id: 'invoice',
                  defaultMessage: 'View invoice',
                })}
                <span aria-hidden="true"> &rarr;</span>
              </a>
            </Link>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {formatMessage({
              id: 'order_placed',
              defaultMessage: 'Order placed',
            })}
            <time
              dateTime="2021-03-22"
              className="ml-2 font-medium text-slate-900 dark:text-slate-100"
            >
              {formatDateTime(order?.ordered)}
            </time>
          </p>
          <a
            href="#"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500 sm:hidden"
          >
            {formatMessage({
              id: 'invoice_mobile',
              defaultMessage: 'View invoice',
            })}
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>

        {/* Products */}
        <div className="mt-6">
          <h2 className="sr-only">
            {formatMessage({
              id: 'Products purchased',
              defaultMessage: 'products_purchased',
            })}
          </h2>

          <div className="mt-6 flex w-full gap-8 divide-y divide-slate-200 border border-slate-200 p-6 text-sm font-medium text-slate-500 sm:flex sm:flex-wrap sm:rounded-lg">
            {order?.items?.map((item) => (
              <div
                key={item._id}
                className="flex flex-auto space-x-6 border-t border-b border-slate-200 bg-white shadow-sm dark:bg-slate-600 dark:shadow-slate-100 sm:rounded-lg sm:border"
              >
                <div className="flex-auto p-4 lg:flex">
                  <div className="sm:flex lg:w-5/6">
                    <div className="w-full flex-shrink-0 overflow-hidden rounded-lg sm:h-40 sm:w-40">
                      <img
                        src={item?.product?.media?.file?.url}
                        alt={item?.product?.texts?.title}
                        className="h-full w-full flex-none rounded-md bg-slate-100 object-fill object-center dark:bg-slate-500"
                      />
                    </div>

                    <div className="ml-4 flex-auto">
                      <h3 className="text-slate-900 dark:text-slate-100">
                        <Link href={`/product/${item?.product?.texts?.slug}`}>
                          <a>{item?.product?.texts?.title}</a>
                        </Link>
                      </h3>
                      <p>{item?.product?.texts?.subtitle}</p>
                      <p>{item?.product?.texts?.description}</p>
                    </div>
                  </div>
                  <p className="text-right font-medium text-slate-900 dark:text-slate-100 lg:flex-auto">
                    {renderPrice(item.total)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery */}
        <div className="mt-16">
          <h2 className="sr-only">
            {formatMessage({
              id: 'delivery_summary',
              defaultMessage: 'Delivery Summary',
            })}
          </h2>

          <div className="bg-slate-100 py-6 px-4 dark:bg-slate-500 sm:rounded-lg sm:px-6 lg:flex lg:gap-x-8 lg:px-8 lg:py-8">
            <dl className="grid grid-cols-2 gap-6 text-sm sm:grid-cols-2 md:gap-x-8 lg:w-7/12 lg:flex-auto">
              <div>
                <dt className="font-medium text-slate-900 dark:text-slate-100">
                  {formatMessage({
                    id: 'delivery_address',
                    defaultMessage: 'Delivery address',
                  })}
                </dt>
                <dd className="mt-3 text-slate-500 dark:text-slate-300">
                  <span className="mb-2 block">
                    {user?.profile?.address?.addressLine}
                  </span>
                  <span className="mb-2 block">
                    {user?.profile?.address?.addressLine2}
                  </span>
                  <span className="mb-2 block">
                    {user?.profile?.address?.addressLine2}
                  </span>
                  <span className="mb-2 block">
                    {user?.profile?.address?.city}&#44;&nbsp;
                    {getFlagEmoji(user?.profile?.address?.countryCode)}&nbsp;
                    {user?.profile?.address?.countryCode}
                  </span>
                </dd>
              </div>

              <div>
                <dt className="font-medium text-slate-900">
                  {formatMessage({
                    id: 'delivery_information',
                    defaultMessage: 'Delivery Information',
                  })}
                </dt>
                <dd className="-ml-4 -mt-1 flex flex-wrap">
                  <div className="ml-4 mt-4 flex-shrink-0">
                    <span>{order?.provider?.type}</span>
                    <p className="sr-only">Visa</p>
                  </div>
                  <div className="ml-4 mt-4">
                    <p className="text-slate-900">Ending with 4242</p>
                    <p className="text-slate-600">Expires 02 / 24</p>
                  </div>
                </dd>
              </div>
            </dl>

            {false && (
              <dl className="mt-8 text-sm lg:col-span-5 lg:mt-0">
                <div className="flex items-center justify-between pb-4">
                  <dt className="font-medium text-slate-900 dark:text-slate-100">
                    {formatMessage({
                      id: 'document',
                      defaultMessage: 'Document',
                    })}
                  </dt>
                </div>
                <div>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-slate-100">
                    <ul className="divide-y divide-gray-200 rounded-md border border-gray-200">
                      {order?.documents?.map((document) => (
                        <li
                          key={document._id}
                          className="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
                        >
                          <div className="flex w-0 flex-1 items-center">
                            <PaperClipIcon
                              className="h-5 w-5 flex-shrink-0 text-gray-400"
                              aria-hidden="true"
                            />
                            <span className="ml-2 w-0 flex-1 truncate">
                              {document.name}
                            </span>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            <a
                              href={document.url}
                              className="font-medium text-blue-600 hover:text-blue-500 dark:text-fuchsia-500 dark:hover:text-fuchsia-600"
                            >
                              {formatMessage({
                                id: 'download',
                                defaultMessage: 'Download',
                              })}
                            </a>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
            )}
          </div>
        </div>

        {/* Billing */}
        <div className="mt-16">
          <h2 className="sr-only">
            {formatMessage({
              id: 'billing_summary',
              defaultMessage: 'Billing Summary',
            })}
          </h2>

          <div className="bg-slate-100 py-6 px-4 dark:bg-slate-600 sm:rounded-lg sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:py-8">
            <dl className="grid grid-cols-2 gap-6 text-sm sm:grid-cols-2 md:gap-x-8 lg:col-span-7">
              <div>
                <dt className="font-medium text-slate-900 dark:text-slate-100">
                  {formatMessage({
                    id: 'billing_address',
                    defaultMessage: 'Billing address',
                  })}
                </dt>
                <dd className="mt-3 text-slate-500 dark:text-slate-300">
                  <span className="block">
                    {order?.billingAddress?.firstName}&nbsp;
                    {order?.billingAddress?.lastName}
                  </span>
                  <span className="block">
                    {order?.billingAddress?.postalCode}&#44;&nbsp;
                    {order?.billingAddress?.addressLine}
                  </span>
                  <span className="block">
                    {order?.billingAddress?.postalCode}&#44;&nbsp;
                    {order?.billingAddress?.addressLine2}
                  </span>
                  {order?.billingAddress?.countryCode && (
                    <span className="block">
                      {user?.profile?.address?.city}&#44;&nbsp;
                      {/* {getFlagEmoji(order?.billingAddress?.countryCode)}&nbsp; */}
                      {order?.billingAddress?.countryCode}
                    </span>
                  )}
                </dd>
              </div>
              <div>
                <dt className="font-medium text-slate-900 dark:text-slate-100">
                  {formatMessage({
                    id: 'payment_information',
                    defaultMessage: 'Payment information',
                  })}
                </dt>
                <dd className="-ml-4 -mt-1 flex flex-wrap">
                  <div className="ml-4 mt-4 flex-shrink-0">
                    <p className="sr-only">Visa</p>
                  </div>
                  <div className="ml-4 mt-4">
                    <p className="text-slate-900 dark:text-slate-100">
                      Ending with 4242
                    </p>
                    <p className="text-slate-600 dark:text-slate-300">
                      Expires 02 / 24
                    </p>
                  </div>
                </dd>
              </div>
            </dl>

            <dl className="mt-8 divide-y divide-slate-200 text-sm lg:col-span-5 lg:mt-0">
              <div className="flex items-center justify-between pb-4">
                <dt className="text-slate-600 dark:text-slate-300">
                  {formatMessage({
                    id: 'subtotal',
                    defaultMessage: 'Subtotal',
                  })}
                </dt>
                <dd className="font-medium text-slate-900 dark:text-slate-100">
                  {renderPrice(order?.total)}
                </dd>
              </div>
              <div className="flex items-center justify-between py-4">
                <dt className="text-slate-600 dark:text-slate-300">
                  {formatMessage({
                    id: 'shipping',
                    defaultMessage: 'Shipping',
                  })}
                </dt>
                <dd className="font-medium text-slate-900 dark:text-slate-100">
                  {renderPrice(order?.delivery?.fee)}
                </dd>
              </div>
              <div className="flex items-center justify-between py-4">
                <dt className="text-slate-600 dark:text-slate-300">
                  {formatMessage({ id: 'Tax', defaultMessage: 'Taxable' })}
                </dt>
                <dd className="font-medium text-slate-900 dark:text-slate-100">
                  {order?.isTaxable}
                </dd>
              </div>
              <div className="flex items-center justify-between pt-4">
                <dt className="font-medium text-slate-900 dark:text-slate-100">
                  {formatMessage({
                    id: 'order_total',
                    defaultMessage: 'Order total',
                  })}
                </dt>
                <dd className="font-medium text-indigo-600 dark:text-lime-600">
                  {renderPrice(order.total)}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailComponent;
