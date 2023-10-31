import { useMutation, gql } from '@apollo/client';

export const UPDATE_CART_PAYMENT_PROVIDER_MUTATION = gql`
  mutation UpdateCartPaymentProvider($paymentProviderId: ID) {
    updateCart(paymentProviderId: $paymentProviderId) {
      _id
      payment {
        _id
        provider {
          _id
        }
        total {
          amount
          currency
        }
      }
      status
      itemsTotal: total(category: ITEMS) {
        amount
        currency
      }
      taxes: total(category: TAXES) {
        amount
        currency
      }
      delivery: total(category: DELIVERY) {
        amount
        currency
      }
      payment: total(category: PAYMENT) {
        amount
        currency
      }
      total {
        amount
        currency
      }
    }
  }
`;

const useUpdateCartPayment = () => {
  const [updateCartPaymentMutation] = useMutation(
    UPDATE_CART_PAYMENT_PROVIDER_MUTATION,
  );

  const updateCartPayment = async ({ paymentProviderId }) => {
    await updateCartPaymentMutation({ variables: { paymentProviderId } });
  };

  return {
    updateCartPayment,
  };
};

export default useUpdateCartPayment;
