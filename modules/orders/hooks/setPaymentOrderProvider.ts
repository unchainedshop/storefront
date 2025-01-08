import { useMutation, gql } from "@apollo/client";

export const SET_ORDER_PAYMENT_PROVIDER_MUTATION = gql`
  mutation SetOrderPaymentProvider($orderId: ID!, $paymentProviderId: ID!) {
    setOrderPaymentProvider(
      orderId: $orderId
      paymentProviderId: $paymentProviderId
    ) {
      _id
      status
      created
      updated
      ordered
      orderNumber
      payment {
        _id
        fee {
          amount
          currency
        }
        provider {
          _id
          type
          interface {
            _id
          }
        }
      }
    }
  }
`;

const useSetOrderPaymentProviderMutation = () => {
  const [setOrderPaymentProviderMutation] = useMutation(
    SET_ORDER_PAYMENT_PROVIDER_MUTATION,
  );

  const setOrderPaymentProvider = async ({ orderId, paymentProviderId }) => {
    await setOrderPaymentProviderMutation({
      variables: { orderId, paymentProviderId },
    });
  };

  return {
    setOrderPaymentProvider,
  };
};

export default useSetOrderPaymentProviderMutation;
