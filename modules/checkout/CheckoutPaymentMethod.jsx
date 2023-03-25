import { gql, useMutation } from '@apollo/client';
import dynamic from 'next/dynamic';

import CryptopayCheckoutButton from './CryptopayCheckoutButton';
import InvoiceCheckoutButton from './InvoiceCheckoutButton';
import DatatransCheckoutButton from './DatatransCheckoutButton';

const StripeCheckoutButton = dynamic(() => import('./StripeCheckoutButton'), {
  ssr: false,
});

export const UPDATE_CART_PAYMENT_PROVIDER_MUTATION = gql`
  mutation UpdateCartPaymentProvider($paymentProviderId: ID) {
    updateCart(paymentProviderId: $paymentProviderId) {
      _id
      payment {
        _id
        provider {
          _id
        }
      }
      status
      total {
        amount
        currency
      }
    }
  }
`;

const CheckoutButtons = {
  'shop.unchained.payment.cryptopay': CryptopayCheckoutButton,
  'shop.unchained.invoice': InvoiceCheckoutButton,
  'shop.unchained.datatrans': DatatransCheckoutButton,
  'shop.unchained.payment.stripe': StripeCheckoutButton,
};

const CheckoutPaymentMethod = ({ cart }) => {
  const [updateOrderPaymentProviderMutation] = useMutation(
    UPDATE_CART_PAYMENT_PROVIDER_MUTATION,
  );

  const setPaymentProvider = async (event) => {
    const formData = new FormData(event.target.form);
    const paymentProviderId = formData.get('paymentProviderId');
    try {
      await updateOrderPaymentProviderMutation({
        variables: { paymentProviderId },
      });
    } catch (e) {
      event.target.form.reset();
    }
  };

  const interfaceId = cart.payment?.provider?.interface?._id;
  const CheckoutButton = CheckoutButtons[interfaceId] ?? (() => null);

  return (
    <div className="mt-6">
      <form>
        <h2 className="text-lg font-medium  mb-4">Zahlungsmittel</h2>
        <div className="space-y-4">
          {cart.supportedPaymentProviders.map((provider) => (
            <div className="flex items-center" key={provider._id}>
              <input
                type="radio"
                id={provider._id}
                name="paymentProviderId"
                value={provider._id}
                defaultChecked={cart.payment?.provider?._id === provider._id}
                onChange={setPaymentProvider}
                className="h-4 w-4 border-stone-300 text-red-600 focus:ring-red-800"
              />
              <label
                htmlFor={provider._id}
                className="ml-3 block text-sm font-medium text-brown-600"
              >
                {CheckoutButtons[provider.interface._id]?.label ||
                  provider.interface._id}
              </label>
            </div>
          ))}
        </div>
      </form>
      <CheckoutButton order={cart} />
    </div>
  );
};

export default CheckoutPaymentMethod;
