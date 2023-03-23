import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';
import useCheckoutCart from '../hooks/useCheckoutCart';

const DatatransPayment = ({ cart, setBillingSameAsDelivery }) => {
  const intl = useIntl();
  const [isPaymentButtonDisabled, setPaymentButtonDisabled] = useState(false);
  const { checkoutCart } = useCheckoutCart();
  const router = useRouter();

  const checkout = async ({
    paymentContext = undefined,
    deliveryContext = undefined,
    orderContext = undefined,
  } = {}) => {
    if (cart?.deliveryInfo?.address === null) setBillingSameAsDelivery();
    await checkoutCart({
      orderId: cart._id,
      orderContext,
      paymentContext,
      deliveryContext,
    });

    router.replace({
      pathname: '/thank-you',
      query: { orderId: cart._id },
    });
  };

  return (
    <button
      type="button"
      role="link"
      disabled={isPaymentButtonDisabled}
      className="button button--primary button--big"
      onClick={async () => {
        setPaymentButtonDisabled(true);
        await checkout(cart);
        setPaymentButtonDisabled(false);
      }}
    >
      {intl.formatMessage({
        id: 'confirm_purchase',
        defaultMessage: 'Confirm binding order',
      })}
    </button>
  );
};

export default DatatransPayment;
