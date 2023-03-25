import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

export const CHECKOUT_CART_BY_INVOICE_MUTATION = gql`
  mutation CheckoutCartByInvoice {
    checkoutCart {
      _id
      status
      user {
        _id
        tokens {
          _id
        }
        cart {
          _id
          items {
            _id
          }
        }
      }
    }
  }
`;

const InvoiceCheckoutButton = () => {
  const [checkoutCartByInvoice] = useMutation(
    CHECKOUT_CART_BY_INVOICE_MUTATION,
  );
  const router = useRouter();

  const checkout = async () => {
    const result = await checkoutCartByInvoice();
    router.replace(`/order/${result.data.checkoutCart._id}/success`);
  };

  return (
    <button
      type="button"
      onClick={checkout}
      className="mt-6 w-full rounded-md border border-transparent bg-red-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-offset-2 focus:ring-offset-stone-50"
    >
      Kostenpflichtig bestellen
    </button>
  );
};

InvoiceCheckoutButton.label = 'Rechnung';

export default InvoiceCheckoutButton;
