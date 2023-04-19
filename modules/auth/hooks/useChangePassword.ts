import { gql, useMutation } from '@apollo/client';

const ChangePasswordMutation = gql`
  mutation ChangePassword(
    $newPlainPassword: String
    $oldPlainPassword: String
  ) {
    changePassword(
      newPlainPassword: $newPlainPassword
      oldPlainPassword: $oldPlainPassword
    ) {
      success
    }
  }
`;

const useChangePassword = () => {
  const [changePasswordMutation, { loading, error }] = useMutation(
    ChangePasswordMutation,
  );

  const changePassword = async ({ oldPassword, newPassword }) => {
    const { data } = await changePasswordMutation({
      variables: {
        oldPlainPassword: oldPassword,
        newPlainPassword: newPassword,
      },
    });
    return data?.changePassword;
  };

  return {
    changePassword,
    error,
    loading,
  };
};

export default useChangePassword;
