import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import renderPrice from '../../common/utils/renderPrice';
import useSetOrderDeliveryProvider from '../../orders/hooks/setOrderDeliveryProvider';

const DeliveryMethod = ({ user }) => {
  const { formatMessage } = useIntl();
  const { setOrderDeliveryProvider } = useSetOrderDeliveryProvider();

  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(
    user?.cart?.deliveryInfo?.provider?._id,
  );

  useEffect(() => {
    const updateDeliveryMethod = async () => {
      await setOrderDeliveryProvider({
        orderId: user?.cart?._id,
        deliveryProviderId: selectedDeliveryMethod,
      });
    };

    updateDeliveryMethod();
  }, [selectedDeliveryMethod]);

  return (
    <div className="mt-10 border-t border-slate-200 pt-10">
      <RadioGroup
        value={selectedDeliveryMethod}
        onChange={setSelectedDeliveryMethod}
      >
        <RadioGroup.Label className="text-lg font-medium text-slate-900 dark:text-white">
          {formatMessage({
            id: 'delivery_method',
            defaultMessage: 'Delivery method',
          })}
        </RadioGroup.Label>

        <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
          {user?.cart?.supportedDeliveryProviders.map((deliveryMethod) => (
            <RadioGroup.Option
              key={deliveryMethod._id}
              value={deliveryMethod._id}
              className={({ checked, active }) =>
                classNames(
                  'relative flex cursor-pointer rounded-lg border border-slate-300 bg-white p-4 shadow-sm focus:outline-none dark:bg-slate-500',
                  {
                    'border-transparent': checked,
                    'ring-2 ring-indigo-500 dark:ring-indigo-800': active,
                  },
                )
              }
            >
              {({ checked, active }) => (
                <>
                  <div className="flex flex-1">
                    <div className="flex flex-col">
                      <RadioGroup.Label
                        as="span"
                        className="block text-sm font-medium text-slate-900 dark:text-white"
                      >
                        {deliveryMethod?.interface?.label}&nbsp;
                        {deliveryMethod?.interface?.version}
                      </RadioGroup.Label>
                      <RadioGroup.Description
                        as="span"
                        className="mt-1 flex items-center text-sm text-slate-500 dark:text-slate-100"
                      >
                        {deliveryMethod?.type}
                      </RadioGroup.Description>
                      <RadioGroup.Description
                        as="span"
                        className="mt-6 text-sm font-medium text-slate-900 dark:text-white"
                      >
                        {renderPrice(deliveryMethod?.simulatedPrice)}
                      </RadioGroup.Description>
                    </div>
                  </div>
                  {checked ? (
                    <CheckCircleIcon
                      className="h-5 w-5 text-indigo-600 dark:text-indigo-800"
                      aria-hidden="true"
                    />
                  ) : null}
                  <div
                    className={classNames(
                      'pointer-events-none absolute -inset-px rounded-lg border-2 border-transparent',
                      {
                        border: active,
                        'border-indigo-500': checked,
                      },
                    )}
                    aria-hidden="true"
                  />
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};

export default DeliveryMethod;
