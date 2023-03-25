import { gql, useQuery } from '@apollo/client';
import ErrorMessage from '../common/components/ErrorMessage';
import CheckoutContact from './CheckoutContact';
import CheckoutAddresses from './CheckoutAddresses';
import CheckoutPaymentMethod from './CheckoutPaymentMethod';

export const CART_CHECKOUT_QUERY = gql`
  query CartCheckout {
    me {
      _id
      cart {
        _id
        total(category: ITEMS) {
          amount
          currency
        }
        payment {
          _id
          provider {
            _id
            type
            interface {
              _id
              label
              version
            }
          }
        }
        supportedPaymentProviders {
          _id
          type
          interface {
            _id
            label
            version
          }
        }
        contact {
          telNumber
          emailAddress
        }
        billingAddress {
          firstName
          lastName
          addressLine
          addressLine2
          postalCode
          regionCode
          city
          countryCode
        }
        delivery {
          _id
          ... on OrderDeliveryShipping {
            address {
              firstName
              lastName
              addressLine
              addressLine2
              postalCode
              regionCode
              city
              countryCode
            }
          }
        }
      }
    }
  }
`;

const Checkout = () => {
  const { loading, error, data } = useQuery(CART_CHECKOUT_QUERY, {
    notifyOnNetworkStatusChange: true,
  });

  if (error) return <ErrorMessage message="Error loading cart" />;
  if (!data?.me?.cart) return <div>Loading</div>;

  if (!data?.me?.cart) return null;

  const isAddressesMissing =
    !data.me.cart.delivery?.address?.firstName &&
    !data.me.cart.billingAddress?.firstName;
  const isContactDataMissing = !data.me.cart.contact?.emailAddress;

  return (
    <div
      data-loading={loading}
      className={`mt-5 lg:grid lg:items-start lg:gap-x-12 ${
        isAddressesMissing ? 'lg:grid-cols-2' : 'lg:grid-cols-2'
      }`}
    >
      <CheckoutAddresses
        cart={data.me.cart}
        profile={data.me.profile}
        isInitial={isAddressesMissing}
      />
      {!isAddressesMissing && <CheckoutContact cart={data.me.cart} />}
      {!isAddressesMissing && !isContactDataMissing && (
        <CheckoutPaymentMethod cart={data.me.cart} />
      )}
    </div>
  );
};

export default Checkout;
