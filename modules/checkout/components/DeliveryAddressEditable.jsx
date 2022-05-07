import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import classNames from 'classnames';
import useUpdateCart from '../hooks/useUpdateCart';
import useUpdateOrderDeliveryShipping from '../hooks/useUpdateDeliveryShipping';
import EditableField from '../../common/components/EditableField';

const DeliveryAddressEditable = ({ user }) => {
  const { formatMessage } = useIntl();
  const { updateCart } = useUpdateCart();
  const { register, handleSubmit } = useForm();
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
      required: true,
      full: false,
    },
    {
      name: 'lastName',
      translation: formatMessage({ id: 'last_name' }),
      type: 'text',
      required: true,
      full: false,
    },
    {
      name: 'company',
      translation: `${formatMessage({
        id: 'company',
      })} ${formatMessage({ id: 'optional' })}`,
      type: 'text',
      required: false,
      full: true,
    },
    {
      name: 'addressLine',
      translation: formatMessage({ id: 'address' }),
      type: 'text',
      required: true,
      full: true,
    },
    {
      name: 'postalCode',
      translation: formatMessage({ id: 'postal_code' }),
      type: 'text',
      required: true,
      full: false,
    },
    {
      name: 'city',
      translation: formatMessage({ id: 'city' }),
      type: 'text',
      required: true,
      full: false,
    },
    {
      name: 'countryCode',
      translation: formatMessage({ id: 'country' }),
      type: 'country',
      required: true,
      full: false,
    },

    {
      name: 'emailAddress',
      translation: formatMessage({ id: 'email' }),
      type: 'email',
      required: true,
      full: true,
    },
    {
      name: 'telNumber',
      translation: formatMessage({ id: 'telephone' }),
      type: 'text',
      required: true,
      full: true,
    },
  ];

  return (
    <form className="form border-top" onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
        {addressFields.map(({ name, translation, type, required, full }) => (
          <div className={classNames({ 'sm:col-span-2': full })} key={name}>
            <label
              htmlFor={name}
              className="block text-sm font-medium text-gray-700"
            >
              <b>{translation}</b>
            </label>
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
                required={required}
              />
            </div>
          </div>
        ))}
      </div>
      <button className="button button--secondary mt-3" type="submit">
        {formatMessage({ id: 'save' })}
      </button>
    </form>
  );
};

export default DeliveryAddressEditable;
