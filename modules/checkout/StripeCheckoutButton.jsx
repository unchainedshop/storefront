import { useEffect, useState } from 'react';
import getConfig from 'next/config';
import { gql, useMutation } from '@apollo/client';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripeCheckoutForm from './StripeCheckoutForm';

const {
  publicRuntimeConfig: { publishableKey },
} = getConfig();

const stripePromise = loadStripe(publishableKey);

export const SIGN_STRIPE_MUTATION = gql`
  mutation SignPaymentProviderForCheckout(
    $orderPaymentId: ID!
    $transactionContext: JSON
  ) {
    signPaymentProviderForCheckout(
      orderPaymentId: $orderPaymentId
      transactionContext: $transactionContext
    )
  }
`;

const StripeCheckoutButton = ({ order }) => {
  const [clientSecret, setClientSecret] = useState('');
  const [signStripeMutation] = useMutation(SIGN_STRIPE_MUTATION);

  const successUrl = `${window.location.origin}/order/${order._id}/success`;
  // const cancelUrl = `${window.location.origin}/checkout`;
  // const errorUrl = `${window.location.origin}/checkout?error=1`;

  const sign = async () => {
    try {
      const transactionContext = {};
      const { data } = await signStripeMutation({
        variables: { orderPaymentId: order.payment._id, transactionContext },
      });
      if (data?.signPaymentProviderForCheckout) {
        setClientSecret(data.signPaymentProviderForCheckout);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    sign();
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  if (clientSecret) {
    return (
      <Elements options={options} stripe={stripePromise}>
        <StripeCheckoutForm orderId={order._id} returnUrl={successUrl} />
      </Elements>
    );
  }
  return <div>Loading...</div>;
};

StripeCheckoutButton.label = 'Karte';

export default StripeCheckoutButton;
