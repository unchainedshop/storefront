import { useIntl } from 'react-intl';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/solid';
import useUser from '../modules/auth/hooks/useUser';
import useSetOrderPaymentProvider from '../modules/orders/hooks/setPaymentOrderProvider';
import DatatransStatusGate from '../modules/checkout/components/DatatransStatusGate';
import BityPayment from '../modules/checkout/components/BityPayment';
import DatatransPayment from '../modules/checkout/components/DatatransPayment';
import WireTransferPayment from '../modules/checkout/components/WireTransferPayment';

import Header from '../modules/layout/components/Header';
import Footer from '../modules/layout/components/Footer';
import ManageCart from '../modules/cart/components/ManageCart';
import DeliveryAddressEditable from '../modules/checkout/components/DeliveryAddressEditable';
import BillingAddressEditable from '../modules/checkout/components/BillingAddressEditable';
import useUpdateOrderDeliveryShipping from '../modules/checkout/hooks/useUpdateDeliveryShipping';
import useUpdateCart from '../modules/checkout/hooks/useUpdateCart';
import MetaTags from '../modules/common/components/MetaTags';
import LoadingItem from '../modules/common/components/LoadingItem';

const Review = () => {
  const { user, loading } = useUser();
  const { formatMessage } = useIntl();
  const router = useRouter();

  const { setOrderPaymentProvider } = useSetOrderPaymentProvider();
  const { updateOrderDeliveryAddress } = useUpdateOrderDeliveryShipping();
  const { updateCart } = useUpdateCart();

  useEffect(() => {
    if (!loading && user?.cart && !user.cart.contact?.emailAddress) {
      router.replace({ pathname: '/checkout' });
    }
  }, [user]);

  const setBillingSameAsDelivery = () => {
    updateCart({
      billingAddress: {
        firstName: user?.cart?.deliveryInfo?.address?.firstName,
        lastName: user?.cart?.deliveryInfo?.address?.lastName,
        company: user?.cart?.deliveryInfo?.address?.company,
        addressLine: user?.cart?.deliveryInfo?.address?.addressLine,
        postalCode: user?.cart?.deliveryInfo?.address?.postalCode,
        city: user?.cart?.deliveryInfo?.address?.city,
        countryCode: user?.cart?.deliveryInfo?.address?.countryCode,
      },
    });
  };

  const selectPayment = async (providerId) => {
    await setOrderPaymentProvider({
      orderId: user.cart._id,
      paymentProviderId: providerId,
    });
  };

  const sameAsDeliveryChange = (event) => {
    if (event.target.checked) {
      if (user?.cart?.deliveryInfo?.address) {
        setBillingSameAsDelivery();
      }
      updateOrderDeliveryAddress({
        orderDeliveryId: user?.cart?.deliveryInfo?._id,
        address: null,
        meta: null,
      });
    } else {
      updateOrderDeliveryAddress({
        orderDeliveryId: user?.cart?.deliveryInfo?._id,
        address: {
          firstName: user?.cart?.billingAddress?.firstName,
          lastName: user?.cart?.billingAddress?.lastName,
          company: user?.cart?.billingAddress?.company,
          addressLine: user?.cart?.billingAddress?.addressLine,
          postalCode: user?.cart?.billingAddress?.postalCode,
          city: user?.cart?.billingAddress?.city,
          countryCode: user?.cart?.billingAddress?.countryCode,
        },
        meta: null,
      });
    }
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(
    user?.cart?.supportedDeliveryProviders[0],
  );

  if (loading) return <LoadingItem />;

  return (
    <>
      <MetaTags title={formatMessage({ id: 'order_review' })} />
      <Header />
      <div className="bg-slate-50 dark:bg-slate-600">
        <div className="mx-auto max-w-full px-4 pt-16 pb-24 sm:px-12 lg:px-16">
          <h2 className="sr-only">
            {formatMessage({ id: 'checkout', defaultMessage: 'Checkout' })}
          </h2>
          <DatatransStatusGate>
            <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
              <div>
                {/* Delivery address */}
                <div>
                  <h2 className="text-lg font-medium text-slate-900 dark:text-white">
                    {formatMessage({ id: 'delivery_address' })}
                  </h2>
                  <DeliveryAddressEditable user={user} />
                </div>

                {/* Delivery Method */}
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
                      {user?.cart?.supportedDeliveryProviders.map(
                        (deliveryMethod) => (
                          <RadioGroup.Option
                            key={deliveryMethod._id}
                            value={deliveryMethod}
                            className={({ checked, active }) =>
                              classNames(
                                checked
                                  ? 'border-transparent'
                                  : 'border-slate-300',
                                active
                                  ? 'ring-2 ring-indigo-500 dark:ring-indigo-800'
                                  : '',
                                'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none dark:bg-slate-500',
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
                                      {deliveryMethod.type}
                                    </RadioGroup.Label>
                                    <RadioGroup.Description
                                      as="span"
                                      className="mt-1 flex items-center text-sm text-slate-500 dark:text-slate-100"
                                    >
                                      {deliveryMethod.turnaround}
                                    </RadioGroup.Description>
                                    <RadioGroup.Description
                                      as="span"
                                      className="mt-6 text-sm font-medium text-slate-900 dark:text-white"
                                    >
                                      {deliveryMethod.price}
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
                                    active ? 'border' : 'border-2',
                                    checked
                                      ? 'border-indigo-500'
                                      : 'border-transparent',
                                    'pointer-events-none absolute -inset-px rounded-lg',
                                  )}
                                  aria-hidden="true"
                                />
                              </>
                            )}
                          </RadioGroup.Option>
                        ),
                      )}
                    </div>
                  </RadioGroup>
                </div>

                {/* Billing Address */}
                <div className="mt-10 border-t border-slate-200 pt-10">
                  <h4 className="mt-5 text-slate-900 dark:text-white">
                    {formatMessage({ id: 'billing_address' })}
                  </h4>

                  <div className="my-3 flex items-start">
                    <label className="mb-5 " htmlFor="same">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 dark:text-indigo-800"
                        id="same"
                        defaultChecked={
                          user?.cart?.deliveryInfo?.address === null
                        }
                        name="same"
                        onChange={(e) => sameAsDeliveryChange(e)}
                      />
                      <span className="ml-3 text-sm font-medium text-slate-700 dark:text-slate-200">
                        {formatMessage({ id: 'same_as_delivery' })}
                      </span>
                    </label>
                  </div>
                  <BillingAddressEditable user={user} />
                </div>
k
                {/* Payment */}
                <div className="mt-10 border-t border-slate-200 pt-10">
                  <h2 className="text-lg font-medium text-slate-900 dark:text-white">
                    {formatMessage({
                      id: 'payment',
                      defaultMessage: 'Payment',
                    })}
                  </h2>

                  <fieldset className="mt-4">
                    <legend className="sr-only">
                      {formatMessage({
                        id: 'payment_type',
                        defaultMessage: 'Payment type',
                      })}
                    </legend>
                    <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                      {user?.cart?.supportedPaymentProviders?.map(
                        (paymentMethod) => (
                          <div
                            key={paymentMethod._id}
                            className="flex items-center"
                          >
                            <input
                              id={paymentMethod._id}
                              name="payment-type"
                              type="radio"
                              className="h-4 w-4 border-slate-300 text-indigo-600 focus:ring-indigo-500"
                              value={paymentMethod._id}
                              checked={
                                paymentMethod._id ===
                                user?.cart?.paymentInfo?.provider?._id
                              }
                              onChange={(e) => {
                                e.preventDefault();
                                selectPayment(paymentMethod._id);
                              }}
                            />

                            <label
                              htmlFor={paymentMethod._id}
                              className="ml-3 block text-sm font-medium text-slate-700 dark:text-slate-200"
                            >
                              {paymentMethod?.interface?._id}
                            </label>
                          </div>
                        ),
                      )}
                    </div>
                  </fieldset>

                  <div className="mt-4">
                    {user?.cart?.paymentInfo?.provider?.interface?._id ===
                    'shop.unchained.invoice' ? (
                      <WireTransferPayment
                        setBillingSameAsDelivery={setBillingSameAsDelivery}
                        cart={user?.cart}
                      />
                    ) : (
                      ''
                    )}
                    {user?.cart?.paymentInfo?.provider?.interface?._id ===
                    'shop.unchained.datatrans' ? (
                      <DatatransPayment cart={user?.cart} />
                    ) : (
                      ''
                    )}
                    {user?.cart?.paymentInfo?.provider?.interface?._id ===
                    'shop.unchained.payment.bity' ? (
                      <BityPayment cart={user?.cart} />
                    ) : (
                      ''
                    )}
                  </div>

                  <div className="mt-6 grid grid-cols-4 gap-y-6 gap-x-4">
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
                        Name on card
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
                        {formatMessage({ id: 'cvc', defaultMessage: 'CVC' })}
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
                </div>
              </div>

              <div className="mt-10 lg:mt-0">
                <h2 className="text-lg font-medium text-slate-900 dark:text-slate-100">
                  {formatMessage({ id: 'order_summary' })}
                </h2>
                <ManageCart user={user} />
              </div>
            </div>
          </DatatransStatusGate>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Review;
