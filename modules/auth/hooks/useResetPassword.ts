import { useMutation, gql } from '@apollo/client';
import CurrentUserFragment from '../fragments/CurrentUserFragment';

export const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword($newPassword: String!, $token: String!) {
    resetPassword(newPlainPassword: $newPassword, token: $token) {
      id
      token
      tokenExpires
      user {
        ...CurrentUserFragment
      }
    }
  }
  ${CurrentUserFragment}
`;

const useResetPassword = () => {
  const [resetPasswordMutation, { client }] = useMutation(
    RESET_PASSWORD_MUTATION,
  );

  const resetPassword = async ({ newPassword, token }) => {
    const result = await resetPasswordMutation({
      variables: { newPassword, token },
    });
    await client.resetStore();
    return result;
  };

  return {
    resetPassword,
  };
};

export default useResetPassword;
