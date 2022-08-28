import { useIntl } from 'react-intl';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ShoppingBagIcon } from '@heroicons/react/solid';

import useUser from '../modules/auth/hooks/useUser';
import DatatransStatusGate from '../modules/checkout/components/DatatransStatusGate';
import ManageCart from '../modules/cart/components/ManageCart';
import DeliveryAddressEditable from '../modules/checkout/components/DeliveryAddressEditable';
import BillingAddressEditable from '../modules/checkout/components/BillingAddressEditable';
import useUpdateOrderDeliveryShipping from '../modules/checkout/hooks/useUpdateDeliveryShipping';
import useUpdateCart from '../modules/checkout/hooks/useUpdateCart';
import MetaTags from '../modules/common/components/MetaTags';
import LoadingItem from '../modules/common/components/LoadingItem';
import NoData from '../modules/common/components/NoData';
import DeliveryMethod from '../modules/checkout/components/DeliveryMethod';
import PaymentMethod from '../modules/checkout/components/PaymentMethod';

const Review = () => {
  const { user, loading } = useUser();
  const { formatMessage } = useIntl();

  const router = useRouter();
  const [isFromSignUp, setIsFromSignUp] = useState(false);

  const { updateOrderDeliveryAddress } = useUpdateOrderDeliveryShipping();
  const { updateCart } = useUpdateCart();
  const [sameCheckbox, setSameCheckbox] = useState(
    user?.cart?.billingAddress !== null,
  );

  useEffect(() => {
    if (!loading && user?.cart && !user.cart.contact?.emailAddress) {
      router.replace({ pathname: '/checkout' });
    }
    setIsFromSignUp(!!router.query?.newSignUp);
  }, [user]);
  useEffect(() => {
    setIsFromSignUp(!!router.query?.newSignUp);
  }, []);

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
    setSameCheckbox(!sameCheckbox);
  };

  if (loading) return <LoadingItem />;

  return (
    <>
      <MetaTags
        title={formatMessage({
          id: 'order_review',
          defaultMessage: 'Order review',
        })}
      />
      {user?.cart ? (
        <div className="bg-slate-50 dark:bg-slate-600">
          <div className="max-w-full px-4 pt-16 pb-24">
            <h2 className="sr-only">
              {formatMessage({ id: 'checkout', defaultMessage: 'Checkout' })}
            </h2>
            <DatatransStatusGate>
              <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
                <div>
                  <div>
                    <h2 className="text-lg font-medium text-slate-900 dark:text-white">
                      {formatMessage({
                        id: 'delivery_address',
                        defaultMessage: 'Delivery address',
                      })}
                    </h2>
                    {!isFromSignUp ? (
                      <DeliveryAddressEditable user={user} />
                    ) : (
                      <button
                        type="submit"
                        onClick={() => setIsFromSignUp(!isFromSignUp)}
                        className="w-50 rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-50"
                      >
                        {formatMessage({
                          id: 'edit_delivery_address',
                          defaultMessage: 'Edit delivery address',
                        })}
                      </button>
                    )}
                  </div>

                  <DeliveryMethod user={user} />

                  <div className="mt-10 border-t border-slate-200 pt-10">
                    <h4 className="mt-5 text-slate-900 dark:text-white">
                      {formatMessage({
                        id: 'billing_address',
                        defaultMessage: 'Billing address',
                      })}
                    </h4>

                    <div className="my-3 flex items-start">
                      <label className="mb-5" htmlFor="same">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 dark:text-indigo-800"
                          id="same"
                          // defaultChecked={user?.cart?.deliveryInfo === null}
                          defaultChecked={sameCheckbox}
                          name="same"
                          onChange={(e) => sameAsDeliveryChange(e)}
                        />
                        <span className="ml-3 text-sm font-medium text-slate-700 dark:text-slate-200">
                          {formatMessage({
                            id: 'same_as_delivery',
                            defaultMessage: 'Same as delivery address',
                          })}
                        </span>
                      </label>
                    </div>
                    <BillingAddressEditable
                      checked={sameCheckbox}
                      user={user}
                    />
                  </div>

                  <PaymentMethod user={user} />
                </div>

                <div className="mt-10 lg:mt-0">
                  <h2 className="text-lg font-medium text-slate-900 dark:text-slate-100">
                    {formatMessage({
                      id: 'order_summary',
                      defaultMessage: 'Order summary',
                    })}
                  </h2>
                  <ManageCart user={user} />
                </div>
              </div>
            </DatatransStatusGate>
          </div>
        </div>
      ) : (
        <NoData
          message={formatMessage({
            id: 'no_item_in_cart',
            defaultMessage: 'item in cart',
          })}
          Icon={<ShoppingBagIcon className="h-8 w-8" />}
        />
      )}
    </>
  );
};

export default Review;
