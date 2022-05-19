import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import classNames from 'classnames';
import useUpdateCart from '../hooks/useUpdateCart';
import useUpdateOrderDeliveryShipping from '../hooks/useUpdateDeliveryShipping';
import EditableField from '../../common/components/EditableField';

const DeliveryAddressEditable = ({ user }) => {
  const { formatMessage } = useIntl();
  const { updateCart } = useUpdateCart();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { updateOrderDeliveryAddress } = useUpdateOrderDeliveryShipping();

  const onSubmit = async ({
    firstName,
    lastName,
    company,
    addressLine,
    postalCode,
    countryCode,
    city,
    emailAddress,
    telNumber,
    message,
  }) => {
    if (user?.cart?.deliveryInfo?.address) {
      updateOrderDeliveryAddress({
        orderDeliveryId: user?.cart?.deliveryInfo?._id,
        address: {
          firstName,
          lastName,
          company,
          addressLine,
          postalCode,
          countryCode,
          city,
        },
      });
      updateCart({
        orderId: user?.cart?._id,
        contact: { emailAddress, telNumber },
        meta: { message },
      });
    } else {
      updateCart({
        orderId: user?.cart?._id,
        contact: { emailAddress, telNumber },
        billingAddress: {
          firstName,
          lastName,
          company,
          addressLine,
          postalCode,
          countryCode,
          city,
        },
      });
    }
  };

  const addressFields = [
    {
      name: 'firstName',
      translation: formatMessage({ id: 'first_name' }),
      type: 'text',
      validator: { required: 'First name must be provided.' },
      full: false,
    },
    {
      name: 'lastName',
      translation: formatMessage({ id: 'last_name' }),
      type: 'text',
      validator: { required: 'First name must be provided.' },
      full: false,
    },
    {
      name: 'company',
      translation: formatMessage({ id: 'company' }),
      type: 'text',
      validator: false,
      full: true,
    },
    {
      name: 'addressLine',
      translation: formatMessage({ id: 'address' }),
      type: 'text',
      validator: { required: 'Address must be provided.' },
      full: false,
    },
    {
      name: 'addressLine2',
      translation: formatMessage({ id: 'address 2' }),
      type: 'text',
      validator: false,
      full: false,
      optional: true,
    },
    {
      name: 'postalCode',
      translation: formatMessage({ id: 'postal_code' }),
      type: 'text',
      validator: { required: 'Postal code must be provided.' },
      full: false,
    },
    {
      name: 'city',
      translation: formatMessage({ id: 'city' }),
      type: 'text',
      validator: { required: 'City must be provided.' },
      full: false,
    },
    {
      name: 'countryCode',
      translation: formatMessage({ id: 'country' }),
      type: 'country',
      validator: { required: 'Country code must be provided.' },
      full: false,
    },
    {
      name: 'telNumber',
      translation: formatMessage({ id: 'telephone' }),
      type: 'text',
      validator: { required: 'Telephone Number must be provided.' },
      full: false,
    },
    {
      name: 'emailAddress',
      translation: formatMessage({ id: 'email' }),
      type: 'email',
      validator: {
        required: 'Email must be provided.',
        pattern: {
          value:
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          message: 'Please enter a valid email address',
        },
      },
      full: true,
    },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
        {addressFields.map(({ name, translation, type, validator, full }) => (
          <div className={classNames({ 'sm:col-span-2': full })} key={name}>
            <div className="flex justify-between">
              <label
                htmlFor={name}
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                <b>{translation}</b>
              </label>
              {!validator && (
                <span className="text-sm text-slate-500">
                  {formatMessage({
                    id: `${name}_optional`,
                    defaultMessage: 'Optional',
                  })}
                </span>
              )}
            </div>
            <div className="mt-1">
              <EditableField
                name={name}
                value={
                  user?.cart?.deliveryInfo?.address?.[name] ||
                  user?.cart?.billingAddress?.[name] ||
                  user?.cart?.contact?.[name]
                }
                register={register}
                type={type}
                validator={validator}
                errors={errors}
              />
              {errors[name] && (
                <p className="text-sm text-red-600">{errors[name].message}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      <button
        className="mt-3 inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 "
        type="submit"
      >
        {formatMessage({ id: 'save' })}
      </button>
    </form>
  );
};

export default DeliveryAddressEditable;
