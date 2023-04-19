import { useMutation, gql } from '@apollo/client';

const ResetPasswordMutation = gql`
  mutation ResetPassword($newPassword: String, $token: String!) {
    resetPassword(newPlainPassword: $newPassword, token: $token) {
      id
      token
      tokenExpires
    }
  }
`;

const useResetPassword = () => {
  const [resetPasswordMutation, { client }] = useMutation(
    ResetPasswordMutation,
  );

  const resetPassword = async (variables: {
    newPassword: string;
    token: string;
  }) => {
    const result = await resetPasswordMutation({
      variables,
      awaitRefetchQueries: true,
    });
    await client.resetStore();
    return result;
  };

  return {
    resetPassword,
  };
};

export default useResetPassword;
