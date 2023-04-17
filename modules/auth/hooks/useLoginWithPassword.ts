import { useMutation, gql } from '@apollo/client';
import isEmail from '../../common/utils/isEmail';

const LogInWithPasswordMutation = gql`
  mutation LoginWithPassword(
    $username: String
    $email: String
    $plainPassword: String
    $totpCode: String
  ) {
    loginWithPassword(
      username: $username
      email: $email
      plainPassword: $plainPassword
      totpCode: $totpCode
    ) {
      id
      token
      tokenExpires
      user {
        _id
        allowedActions
        roles
        isTwoFactorEnabled
      }
    }
  }
`;

const useLoginWithPassword = () => {
  const [logInWithPasswordMutation, { client }] = useMutation(
    LogInWithPasswordMutation,
    {
      errorPolicy: 'all',
    },
  );

  const logInWithPassword = async ({ usernameOrEmail, password, totpCode }) => {
    const variables: any = {
      username: null,
      totpCode,
      plainPassword: null,
    };

    if (isEmail(usernameOrEmail)) {
      const normalizedEmail = usernameOrEmail?.trim();
      variables.email = normalizedEmail;
    } else {
      variables.username = usernameOrEmail;
    }

    variables.plainPassword = password;

    const result = await logInWithPasswordMutation({
      variables,
      awaitRefetchQueries: true,
    });

    await client.resetStore();
    return result;
  };

  return {
    logInWithPassword,
  };
};

export default useLoginWithPassword;
