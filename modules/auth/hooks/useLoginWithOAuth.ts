import { useMutation, gql, useApolloClient } from '@apollo/client';

const FORGOT = gql`
  mutation logInWithOAuth($authorizationCode: String!, $service: String) {
    loginWithOAuth(authorizationCode: $authorizationCode, service: $service) {
      id
      token
      tokenExpires
    }
  }
`;

const useLogInWithOAuth = () => {
  const apollo = useApolloClient();
  const [logInWithOAuthMutation] = useMutation(FORGOT);

  const logInWithOAuth = async ({ authorizationCode, service }) => {
    const loginResult = await logInWithOAuthMutation({
      variables: { authorizationCode, service },
      awaitRefetchQueries: true,
    });

    await apollo.resetStore();
    return loginResult;
  };

  return { logInWithOAuth };
};

export default useLogInWithOAuth;
