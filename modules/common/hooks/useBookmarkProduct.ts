import { useMutation, gql } from "@apollo/client";

const AddBookmarkMutation = gql`
  mutation Bookmark($productId: ID!) {
    bookmark(productId: $productId) {
      _id
      user {
        _id
        bookmarks {
          _id
        }
      }
    }
  }
`;

const useBookmarkProduct = () => {
  const [bookmarkProductMutation] = useMutation(AddBookmarkMutation);

  const bookmarkProduct = async ({ productId }) => {
    await bookmarkProductMutation({ variables: { productId } });
  };

  return {
    bookmarkProduct,
  };
};

export default useBookmarkProduct;
