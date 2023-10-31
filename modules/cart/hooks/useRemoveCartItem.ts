import { useMutation, gql } from '@apollo/client';

export const REMOVE_CART_ITEM_MUTATION = gql`
  mutation RemoveCartItem($itemId: ID!) {
    removeCartItem(itemId: $itemId) {
      _id
      order {
        _id
        items {
          _id
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
      }
    }
  }
`;

const useRemoveCartItem = () => {
  const [removeCartItemMutation] = useMutation(REMOVE_CART_ITEM_MUTATION);

  const removeCartItem = async ({ itemId }) => {
    await removeCartItemMutation({ variables: { itemId } });
  };

  return {
    removeCartItem,
  };
};

export default useRemoveCartItem;
