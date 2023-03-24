import { useMutation, gql } from '@apollo/client';

const VERIFY_EMAIL_MUTATION = gql`
  mutation VerifyEmail($token: String!) {
    verifyEmail(token: $token) {
      id
      token
      tokenExpires
      user {
        _id
        emails {
          address
          verified
        }
      }
    }
  }
`;

const useVerifyEmail = () => {
  const [verifyEmailMutation, { error }] = useMutation(VERIFY_EMAIL_MUTATION);

  const verifyEmail = async ({ token }) => {
    return verifyEmailMutation({
      variables: { token },
    });
  };

  return {
    verifyEmail,
    error,
  };
};

export default useVerifyEmail;
