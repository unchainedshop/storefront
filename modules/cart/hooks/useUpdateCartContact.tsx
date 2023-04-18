import { useMutation, gql } from '@apollo/client';

const UpdateCart = gql`
  mutation UpdateCartContact($contact: ContactInput) {
    updateCart(contact: $contact) {
      _id
      contact {
        emailAddress
        telNumber
      }
    }
  }
`;

const useUpdateCartContact = () => {
  const [updateCartContactMutation] = useMutation(UpdateCart);

  const updateCartContact = async ({ contact }) => {
    await updateCartContactMutation({ variables: { contact } });
  };

  return {
    updateCartContact,
  };
};

export default useUpdateCartContact;
