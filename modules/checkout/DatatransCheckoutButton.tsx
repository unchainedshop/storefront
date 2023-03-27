import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

export const SIGN_DATATRANS_MUTATION = gql`
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

const DatatransCheckoutButton = ({ order }) => {
  const router = useRouter();
  const [signDatatransMutation] = useMutation(SIGN_DATATRANS_MUTATION);

  const sign = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      const successUrl = `${window.location.origin}/order/${order._id}/success`;
      const cancelUrl = `${window.location.origin}/checkout`;
      const errorUrl = `${window.location.origin}/checkout?error=1`;
      const transactionContext = {
        option: {
          createAlias: false,
        },
        redirect: {
          successUrl,
          cancelUrl,
          errorUrl,
        },
      };
      const { data } = await signDatatransMutation({
        variables: { orderPaymentId: order.payment._id, transactionContext },
      });
      if (data?.signPaymentProviderForCheckout) {
        const { location } = JSON.parse(
          data.signPaymentProviderForCheckout || {},
        );
        if (location) {
          router.push(location);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <button
      type="button"
      onClick={sign}
      className="mt-6 w-full rounded-md border border-transparent bg-red-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-offset-2 focus:ring-offset-stone-50"
    >
      Mit Karte/Twint bezahlen
    </button>
  );
};

DatatransCheckoutButton.label = 'Karte / Twint';

export default DatatransCheckoutButton;
