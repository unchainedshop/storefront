import { useMutation, gql, useApolloClient } from '@apollo/client';

const FORGOT = gql`
  mutation logInWithOAuth(
    $authorizationCode: String!
    $provider: String!
    $redirectUrl: String!
  ) {
    loginWithOAuth(
      authorizationCode: $authorizationCode
      provider: $provider
      redirectUrl: $redirectUrl
    ) {
      id
      token
      tokenExpires
    }
  }
`;

const useLogInWithOAuth = () => {
  const apollo = useApolloClient();
  const [logInWithOAuthMutation] = useMutation(FORGOT);

  const logInWithOAuth = async ({
    authorizationCode,
    provider,
    redirectUrl,
  }) => {
    const loginResult = await logInWithOAuthMutation({
      variables: { authorizationCode, provider, redirectUrl },
      awaitRefetchQueries: true,
    });

    await apollo.resetStore();
    return loginResult;
  };

  return { logInWithOAuth };
};

export default useLogInWithOAuth;
