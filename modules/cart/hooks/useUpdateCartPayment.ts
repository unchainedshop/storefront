import { useMutation, gql } from '@apollo/client';

const UpdateCart = gql`
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

const useUpdateCartPayment = () => {
  const [updateCartPaymentMutation] = useMutation(UpdateCart);

  const updateCartPayment = async ({ paymentProviderId }) => {
    await updateCartPaymentMutation({ variables: { paymentProviderId } });
  };

  return {
    updateCartPayment,
  };
};

export default useUpdateCartPayment;
