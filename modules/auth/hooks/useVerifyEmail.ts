import { useMutation, gql } from '@apollo/client';

const VerifyEmailMutation = gql`
  mutation VerifyEmail($token: String!) {
    verifyEmail(token: $token) {
      id
      token
      tokenExpires
      user {
        _id
      }
    }
  }
`;

const useVerifyEmail = () => {
  const [verifyEmailMutation, { client, ...props }] =
    useMutation(VerifyEmailMutation);
  const verifyEmail = async ({ token }) => {
    const result = await verifyEmailMutation({
      variables: {
        token,
      },
      awaitRefetchQueries: true,
    });
    await client.resetStore();
    return result;
  };

  return {
    verifyEmail,
    ...props,
  };
};

export default useVerifyEmail;
