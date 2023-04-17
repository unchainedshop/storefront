import { useMutation, gql } from '@apollo/client';

const ForgotPasswordMutation = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email) {
      success
    }
  }
`;

const useForgotPassword = () => {
  const [forgotPasswordMutation] = useMutation(ForgotPasswordMutation);

  const forgotPassword = async ({ email }) => {
    return forgotPasswordMutation({
      variables: { email },
    });
  };

  return {
    forgotPassword,
  };
};

export default useForgotPassword;
