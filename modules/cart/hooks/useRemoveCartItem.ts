import { useMutation, gql } from '@apollo/client';

export const REMOVE_CART_ITEM_MUTATION = gql`
  mutation RemoveCartItem($itemId: ID!) {
    removeCartItem(itemId: $itemId) {
      _id
    }
  }
`;

const useRemoveCartItem = () => {
  const [removeCartItemMutation] = useMutation(REMOVE_CART_ITEM_MUTATION, {
    refetchQueries: ['user', 'cart'],
  });

  const removeCartItem = async ({ itemId }) => {
    await removeCartItemMutation({ variables: { itemId } });
  };

  return {
    removeCartItem,
  };
};

export default useRemoveCartItem;
