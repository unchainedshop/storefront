import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import useUpdateCart from '../hooks/useUpdateCart';
import EditableField from '../../common/components/EditableField';

const BillingAddressEditable = ({ user }) => {
  const [isEditing, setEditing] = useState(false);
  const { formatMessage } = useIntl();
  const { updateCart } = useUpdateCart();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    setEditing(!user?.cart?.billingAddress);
  }, [user]);

  const onSubmit = async ({
    firstName,
    lastName,
    company,
    addressLine,
    postalCode,
    countryCode,
    city,
  }) => {
    if (isEditing) {
      await updateCart({
        orderId: user?.cart?._id,
        billingAddress: {
          firstName,
          lastName,
          company,
          addressLine,
          postalCode,
          city,
          countryCode,
        },
      });

      setEditing(false);
    } else {
      setEditing(true);
    }
  };

  const addressFields = [
    {
      name: 'firstName',
      translation: formatMessage({ id: 'first_name' }),
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      translation: formatMessage({ id: 'last_name' }),
      type: 'text',
      required: true,
    },
    {
      name: 'company',
      translation: `${formatMessage({
        id: 'company',
      })} ${formatMessage({ id: 'optional' })} `,
      type: 'text',
      required: false,
    },
    {
      name: 'addressLine',
      translation: formatMessage({ id: 'address' }),
      type: 'text',
      required: true,
    },
    {
      name: 'postalCode',
      translation: formatMessage({ id: 'postal_code' }),
      type: 'text',
      required: true,
    },
    {
      name: 'city',
      translation: formatMessage({ id: 'city' }),
      type: 'text',
      required: true,
    },
    {
      name: 'countryCode',
      translation: formatMessage({ id: 'country' }),
      type: 'country',
      required: true,
    },
  ];

  return (
    <>
      {!user?.cart?.deliveryInfo?.address ? (
        ''
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
            {addressFields.map(({ name, translation, type, required }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">
                  <b>{translation}</b>
                </label>
                <div className="mt-1">
                  <EditableField
                    name={name}
                    value={user?.cart?.billingAddress?.[name]}
                    register={register}
                    isEditing={isEditing}
                    type={type}
                    required={required}
                  />
                </div>
              </div>
            ))}
          </div>
          <button
            className="mt-3 mb-5 inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            type="submit"
          >
            {formatMessage({ id: 'save' })}
          </button>
        </form>
      )}
    </>
  );
};

export default BillingAddressEditable;
