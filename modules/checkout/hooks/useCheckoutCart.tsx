import { useMutation, gql } from '@apollo/client';

const CheckoutCartMutation = gql`
  mutation CheckoutCart(
    $orderId: ID!
    $orderContext: JSON
    $paymentContext: JSON
    $deliveryContext: JSON
  ) {
    checkoutCart(
      orderId: $orderId
      orderContext: $orderContext
      paymentContext: $paymentContext
      deliveryContext: $deliveryContext
    ) {
      status
    }
  }
`;

const useCheckoutCartMutation = () => {
  const [checkoutCartMutation] = useMutation(CheckoutCartMutation, {
    refetchQueries: ['user'],
  });

  const checkoutCart = async ({
    orderId,
    orderContext,
    paymentContext,
    deliveryContext,
  }) => {
    await checkoutCartMutation({
      variables: { orderId, orderContext, paymentContext, deliveryContext },
    });
  };

  return {
    checkoutCart,
  };
};

export default useCheckoutCartMutation;
