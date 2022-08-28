import { useIntl } from 'react-intl';

const CardPaymentForm = () => {
  const { formatMessage } = useIntl();
  return (
    <div className="grid grid-cols-4 gap-y-6 gap-x-4">
      <div className="col-span-4">
        <label
          htmlFor="card-number"
          className="block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          {formatMessage({
            id: 'card',
            defaultMessage: 'Card Number',
          })}
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="card-number"
            name="card-number"
            autoComplete="cc-number"
            className="block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-slate-300 dark:shadow-white sm:text-sm"
          />
        </div>
      </div>

      <div className="col-span-4">
        <label
          htmlFor="name-on-card"
          className="block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          {formatMessage({
            id: 'name_on_card',
            defaultMessage: 'Name on card',
          })}
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="name-on-card"
            name="name-on-card"
            autoComplete="cc-name"
            className="block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-slate-300 dark:shadow-white sm:text-sm"
          />
        </div>
      </div>

      <div className="col-span-3">
        <label
          htmlFor="expiration-date"
          className="block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          {formatMessage({
            id: 'expiration_date',
            defaultMessage: 'Expiration date (MM/YY)',
          })}
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="expiration-date"
            id="expiration-date"
            autoComplete="cc-exp"
            className="block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-slate-300 dark:shadow-white sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="cvc"
          className="block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          {formatMessage({
            id: 'cvc',
            defaultMessage: 'CVC',
          })}
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="cvc"
            id="cvc"
            autoComplete="csc"
            className="block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-slate-300 dark:shadow-white sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default CardPaymentForm;
