import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import useUpdateCart from '../hooks/useUpdateCart';
import EditableField from '../../common/components/EditableField';

const BillingAddressEditable = ({ user, checked }) => {
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
      translation: formatMessage({
        id: 'first_name',
        defaultMessage: 'First name',
      }),
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      translation: formatMessage({
        id: 'last_name',
        defaultMessage: 'Last name',
      }),
      type: 'text',
      required: true,
    },
    {
      name: 'company',
      translation: `${formatMessage({
        id: 'company',
        defaultMessage: 'Company',
      })} ${formatMessage({ id: 'optional', defaultMessage: 'Optional' })} `,
      type: 'text',
      required: false,
    },
    {
      name: 'addressLine',
      translation: formatMessage({ id: 'address', defaultMessage: 'Address' }),
      type: 'text',
      required: true,
    },
    {
      name: 'postalCode',
      translation: formatMessage({
        id: 'postal_code',
        defaultMessage: 'Postal code',
      }),
      type: 'text',
      required: true,
    },
    {
      name: 'city',
      translation: formatMessage({ id: 'city', defaultMessage: 'City' }),
      type: 'text',
      required: true,
    },
    {
      name: 'countryCode',
      translation: formatMessage({ id: 'country', defaultMessage: 'Country' }),
      type: 'country',
      required: true,
    },
  ];

  return (
    <>
      {checked ? (
        ''
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
            {addressFields.map(({ name, translation, type, required }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
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
            className="mt-3 mb-5 inline-flex items-center rounded-md  bg-slate-900 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
            type="submit"
          >
            {formatMessage({ id: 'save', defaultMessage: 'Save' })}
          </button>
        </form>
      )}
    </>
  );
};

export default BillingAddressEditable;
