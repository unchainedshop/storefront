import { useMutation, gql } from '@apollo/client';

const AddEmailMutation = gql`
  mutation addEmail($email: String!) {
    addEmail(email: $email) {
      _id
      emails {
        address
        verified
      }
    }
  }
`;

const useAddEmail = () => {
  const [addEmailMutation, { error }] = useMutation(AddEmailMutation);

  const addEmail = async (email) => {
    return addEmailMutation({
      variables: { email },
    });
  };

  return {
    addEmail,
    error,
  };
};

export default useAddEmail;
