import { useMutation, gql } from '@apollo/client';

export const UPDATE_CART_ITEM_MUTATION = gql`
  mutation UpdateCartItem($itemId: ID!, $quantity: Int = 1) {
    updateCartItem(itemId: $itemId, quantity: $quantity) {
      _id
      quantity
      total {
        amount
        currency
      }
    }
  }
`;

const useUpdateCartItem = () => {
  const [updateCartItemMutation] = useMutation(UPDATE_CART_ITEM_MUTATION);

  const updateCartItem = async ({ itemId, quantity = 1 }) => {
    await updateCartItemMutation({ variables: { itemId, quantity } });
  };

  return {
    updateCartItem,
  };
};

export default useUpdateCartItem;
