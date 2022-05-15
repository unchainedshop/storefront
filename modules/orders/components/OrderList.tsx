import { CheckCircleIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import SearchField from '../../common/components/SearchField';

import renderPrice from '../../common/utils/renderPrice';
import useFormatDateTime from '../../common/utils/useFormatDateTime';

const orderStatus = {
  OPEN: {
    text: 'ordered',
    date: 'ordered',
  },
  PENDING: {
    text: 'PENDING',
  },
  CONFIRMED: {
    text: 'CONFIRMED',
    date: 'confirmed',
  },
  FULLFILLED: {
    text: 'Delivered',
    icon: (
      <CheckCircleIcon className="h-5 w-5 text-green-500" aria-hidden="true" />
    ),
    date: 'fullfilled',
  },
};

const OrderList = ({ orders, queryString, setQueryString }) => {
  const { formatMessage } = useIntl();
  const { formatDateTime } = useFormatDateTime();

  return (
    <div className="bg-white dark:bg-slate-600">
      <div className="mx-4 max-w-full px-4 pt-16 sm:px-6 lg:px-8">
        <div className="max-w-full">
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
            {formatMessage({
              id: 'order_history',
              defaultMessage: 'Order History',
            })}
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {formatMessage({
              id: 'manage_orders',
              defaultMessage:
                'Check the status of recent orders, manage returns, and download invoices.',
            })}
          </p>
        </div>

        <div className="my-4">
          <SearchField
            defaultValue={queryString}
            onInputChange={setQueryString}
          />
        </div>

        <div className="mt-4 sm:mt-8">
          <h2 className="sr-only">
            {formatMessage({
              id: 'recent_orders',
              defaultMessage: 'Recent orders',
            })}
          </h2>

          <div className="rounded-lg bg-slate-50 py-6 px-4 dark:bg-slate-500 sm:flex sm:items-center sm:justify-between sm:space-x-6 sm:px-6 lg:space-x-8">
            <dl className="w-full space-y-6 divide-y divide-slate-300 text-base text-slate-600 dark:text-slate-300 sm:grid sm:space-y-0 lg:flex-none">
              <div className="hidden sm:block sm:pb-6">
                <div className="flex-auto sm:grid sm:w-5/6 sm:grid-cols-6 sm:gap-x-6 lg:gap-x-8">
                  <div className="flex justify-between sm:block">
                    <dt className="font-medium text-slate-900 dark:text-slate-100">
                      {formatMessage({
                        id: 'order_date',
                        defaultMessage: 'Order Date',
                      })}
                    </dt>
                  </div>
                  <div className="flex justify-between pt-6 sm:block sm:pt-0">
                    <dt className="font-medium text-slate-900 dark:text-slate-100">
                      {formatMessage({
                        id: 'order_number',
                        defaultMessage: 'Order number',
                      })}
                    </dt>
                  </div>
                  <div className="flex justify-between pt-6 sm:block sm:pt-0">
                    <dt className="font-medium text-slate-900 dark:text-slate-100">
                      {formatMessage({
                        id: 'total_amount',
                        defaultMessage: 'Total amount',
                      })}
                    </dt>
                  </div>
                  <div className="flex justify-between pt-6 sm:block sm:pt-0">
                    <dt className="font-medium text-slate-900 dark:text-slate-100">
                      {formatMessage({
                        id: 'payment_status',
                        defaultMessage: 'Payment status',
                      })}
                    </dt>
                  </div>
                  <div className="flex justify-between pt-6 sm:block sm:pt-0">
                    <dt className="font-medium text-slate-900 dark:text-slate-100">
                      {formatMessage({
                        id: 'order_status',
                        defaultMessage: 'Order status',
                      })}
                    </dt>
                  </div>
                  <div className="flex justify-between pt-6 sm:block sm:pt-0">
                    <dt className="font-medium text-slate-900 dark:text-slate-100">
                      {formatMessage({
                        id: 'Delivery_status',
                        defaultMessage: 'Delivery status',
                      })}
                    </dt>
                  </div>
                </div>
                <div />
              </div>
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="w-full py-6 sm:flex sm:space-x-6 lg:space-x-8"
                >
                  <div className="sm:grid sm:w-5/6 sm:grid-cols-6 sm:gap-x-6 lg:gap-x-8">
                    <div className="flex justify-between sm:block">
                      <dt className="font-medium text-slate-900 dark:text-slate-100 sm:hidden">
                        {formatMessage({
                          id: 'order_date',
                          defaultMessage: 'Order date',
                        })}
                      </dt>
                      <dd className="sm:mt-1">
                        <time dateTime={order.datetime}>
                          {formatDateTime(order?.ordered)}
                        </time>
                      </dd>
                    </div>
                    <div className="flex justify-between pt-6 sm:block sm:pt-0">
                      <dt className="font-medium text-slate-900 dark:text-slate-100 sm:hidden">
                        {formatMessage({
                          id: 'order_number',
                          defaultMessage: 'Order number',
                        })}
                      </dt>
                      <dd className="sm:mt-1">{order?.orderNumber}</dd>
                    </div>
                    <div className="flex justify-between pt-6 sm:block sm:pt-0">
                      <dt className="font-medium text-slate-900 dark:text-slate-100 sm:hidden">
                        {formatMessage({
                          id: 'total_amount',
                          defaultMessage: 'Total amount',
                        })}
                      </dt>
                      <dd className="sm:mt-1">{renderPrice(order.total)}</dd>
                    </div>
                    <div className="flex justify-between pt-6 sm:block sm:pt-0">
                      <dt className="font-medium text-slate-900 dark:text-slate-100 sm:hidden">
                        {formatMessage({
                          id: 'payment_status',
                          defaultMessage: 'Payment_status',
                        })}
                      </dt>
                      <dd className="sm:mt-1">{order?.payment?.status}</dd>
                    </div>
                    <div className="flex items-center justify-between pt-6 sm:pt-0">
                      <dt className="font-medium text-slate-900 dark:text-slate-100 sm:hidden">
                        {formatMessage({
                          id: 'status',
                          defaultMessage: 'Status',
                        })}
                      </dt>
                      <dd className="uppercase sm:mt-1">
                        <div className="flex items-center gap-x-2">
                          {orderStatus[order?.status]?.icon &&
                            orderStatus[order?.status].icon}
                          {orderStatus[order?.status]?.text}
                          {orderStatus[order?.status]?.date && (
                            <>
                              {formatMessage({
                                id: 'on',
                                defaultMessage: ' on ',
                              })}
                              <time dateTime={order.datetime}>
                                {formatDateTime(
                                  order[orderStatus[order?.status].date],
                                )}
                              </time>
                            </>
                          )}
                        </div>
                      </dd>
                    </div>
                    <div className="flex justify-between pt-6 sm:block sm:pt-0">
                      <dt className="font-medium text-slate-900 dark:text-slate-100 sm:hidden">
                        {formatMessage({
                          id: 'delivery_status',
                          defaultMessage: 'Delivery status',
                        })}
                      </dt>
                      <dd className="sm:mt-1">{order?.delivery?.status}</dd>
                    </div>
                  </div>
                  <Link href={`orders/${order?._id}`}>
                    <a className="ml-auto mt-6 flex w-full items-center justify-center rounded-md border border-slate-300 bg-white py-2 px-4 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto">
                      {formatMessage({
                        id: 'view_invoice',
                        defaultMessage: 'View Invoice',
                      })}
                      <span className="sr-only">
                        {formatMessage({
                          id: 'for_order',
                          defaultMessage: 'for order ',
                        })}
                        {order?.number}
                      </span>
                    </a>
                  </Link>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
