import { useMutation, gql, useApolloClient } from '@apollo/client';

export const LOGIN_AS_WITH_OAUTH_MUTATION = gql`
  mutation LogInWithOAuth(
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
  const [logInWithOAuthMutation] = useMutation(LOGIN_AS_WITH_OAUTH_MUTATION);

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
