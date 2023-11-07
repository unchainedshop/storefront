import { useIntl } from 'react-intl';
import { useFormatPrice } from '../common/utils/utils';

const OrderDetailBilling = ({ order }) => {
  const { formatMessage } = useIntl();
  const { formatPrice } = useFormatPrice();

  return (
    <section aria-labelledby="summary-heading">
      <h2 id="summary-heading" className="sr-only">
        {formatMessage({
          id: 'billing_summary',
          defaultMessage: 'Billing Summary',
        })}
      </h2>

      <div className="md:grid md:grid-cols-2 md:gap-x-8 print:flex">
        <dl className="bg-white dark:bg-slate-800 p-4 shadow dark:shadow-none sm:rounded-lg grid justify-center text-sm md:justify-start md:gap-x-8">
          <div>
            <span className="text-xl mb-5 block font-bold">
              {order?.billingAddress?.firstName ||
                order?.billingAddress?.lastName ||
                'n/a'}
            </span>
            <dt className="mb-2 font-medium">
              {formatMessage({
                id: 'billing_address',
                defaultMessage: 'Billing address',
              })}
            </dt>
            <span className="my-1 inline-block">
              {order?.billingAddress?.postalCode}
            </span>
            &nbsp;
            <span className="my-1 inline-block">
              {order?.billingAddress?.addressLine}
            </span>
            <span className="block">{order?.billingAddress?.city}</span>
            <span className="my-1 inline-block">
              {`${order?.country.name}, ${order?.country.flagEmoji}`}
            </span>
          </div>
        </dl>

        <dl className="bg-white dark:bg-slate-800 p-4 shadow dark:shadow-none sm:rounded-lg mt-4 divide-y divide-slate-50 dark:divide-slate-700 text-sm lg:mt-0">
          <div className="flex items-center justify-between pb-3 text-lg">
            <dt className="font-bold">
              {formatMessage({
                id: 'order_total',
                defaultMessage: 'Order total',
              })}
            </dt>
            <dd className="font-bold">{formatPrice(order?.total)}</dd>
          </div>
          <div className="flex items-center justify-between py-1">
            <dt className="text-slate-600 dark:text-slate-200">
              {formatMessage({
                id: 'discount',
                defaultMessage: 'Discount',
              })}
            </dt>
            <dd className="font-medium">{formatPrice(order?.totalDiscount)}</dd>
          </div>
          <div className="flex items-center justify-between py-1">
            <dt className="text-slate-600 dark:text-slate-200">
              {formatMessage({
                id: 'shipping',
                defaultMessage: 'Shipping',
              })}
            </dt>
            <dd className="font-medium">{formatPrice(order?.totalDelivery)}</dd>
          </div>
          <div className="flex items-center justify-between py-1">
            <dt className="text-slate-600 dark:text-slate-200">
              {formatMessage({
                id: 'tax',
                defaultMessage: 'Tax',
              })}
            </dt>
            <dd className="font-medium">{formatPrice(order?.totalTax)}</dd>
          </div>
          <div className="flex items-center justify-between py-1">
            <dt className="text-slate-600 dark:text-slate-200">
              {formatMessage({
                id: 'order_payment_fees',
                defaultMessage: 'Fees',
              })}
            </dt>
            <dd className="font-medium">{formatPrice(order?.totalPayment)}</dd>
          </div>
          <div className="flex items-center justify-between py-1">
            <dt className="text-slate-600 dark:text-slate-200">
              {formatMessage({
                id: 'subtotal',
                defaultMessage: 'Subtotal',
              })}
            </dt>
            <dd className="font-medium">{formatPrice(order?.itemsTotal)}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
};

export default OrderDetailBilling;
