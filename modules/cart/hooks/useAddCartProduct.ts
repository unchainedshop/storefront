import { gql, useMutation } from '@apollo/client';
import { LOGIN_AS_GUEST_MUTATION } from '../../auth/hooks/useLoginAsGuest';
import useUser from '../../auth/hooks/useUser';

export const ADD_CART_PRODUCT_MUTATION = gql`
  mutation AddCartProduct(
    $productId: ID!
    $quantity: Int
    $configuration: [ProductConfigurationParameterInput!]
  ) {
    addCartProduct(
      productId: $productId
      quantity: $quantity
      configuration: $configuration
    ) {
      _id
      order {
        _id
        items {
          _id
          quantity
          total {
            amount
            currency
          }
          unitPrice {
            amount
            currency
          }
        }
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
        user {
          _id
          cart {
            _id
          }
        }
      }
    }
  }
`;

const useAddCartProduct = () => {
  const [addCartProductMutation, { client, ...mutationResults }] = useMutation(
    ADD_CART_PRODUCT_MUTATION,
  );
  const { user } = useUser();
  const [loginAsGuestMutation] = useMutation(LOGIN_AS_GUEST_MUTATION);

  const addCartProduct = async (
    variables: {
      configuration: Array<{ key: string; value: string }>;
      quantity: number;
      productId: string;
    },
    options,
  ) => {
    try {
      if (!user) {
        await loginAsGuestMutation({
          awaitRefetchQueries: true,
        });
        await client.resetStore();
      }
      await addCartProductMutation({
        variables,
        ...options,
      });
    } catch (err: any) {
      if (err.message.toLowerCase().includes('not enough in stock')) {
        alert('Out of stock');
      }
    }
  };

  return [addCartProduct, mutationResults];
};

export default useAddCartProduct;
