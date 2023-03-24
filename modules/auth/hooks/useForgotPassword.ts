import { useMutation, gql } from '@apollo/client';

const ForgotPasswordMutation = gql`
  mutation forgotPassword($email: String!) {
    forgotPassword(email: $email) {
      success
    }
  }
`;

const useForgotPassword = () => {
  const [forgotPasswordMutation] = useMutation(ForgotPasswordMutation, {
    errorPolicy: 'all',
  });

  const forgotPassword = async ({ email }) => {
    const result = await forgotPasswordMutation({ variables: { email } });
    return result;
  };

  return { forgotPassword };
};

export default useForgotPassword;
