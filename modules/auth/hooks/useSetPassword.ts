import { useMutation, gql } from '@apollo/client';

const SetPasswordMutation = gql`
  mutation SetPassword(
    $newPassword: HashedPasswordInput
    $newPlainPassword: String
    $userId: ID!
  ) {
    setPassword(
      newPassword: $newPassword
      newPlainPassword: $newPlainPassword
      userId: $userId
    ) {
      _id
    }
  }
`;

const useSetPassword = () => {
  const [setPasswordMutation] = useMutation(SetPasswordMutation);

  const setPassword = async ({ newPassword = undefined, userId }) => {
    const variables = { newPlainPassword: null, newPassword: null, userId };

    variables.newPlainPassword = newPassword;

    return setPasswordMutation({ variables });
  };

  return {
    setPassword,
  };
};

export default useSetPassword;
