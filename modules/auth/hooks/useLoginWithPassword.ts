import { useMutation, gql } from '@apollo/client';
import { useIntl } from 'react-intl';
import { useAppContext } from '../../common/components/AppContextWrapper';

import CurrentUserFragment from '../fragments/CurrentUserFragment';

const LoginWithPasswordMutation = gql`
  mutation LoginWithPassword(
    $email: String!
    $plainPassword: String
    $password: HashedPasswordInput
    $forceLocale: String
    $currency: String
  ) {
    loginWithPassword(
      email: $email
      plainPassword: $plainPassword
      password: $password
    ) {
      id
      token
      tokenExpires
      user {
        ...CurrentUserFragment
      }
    }
  }
  ${CurrentUserFragment}
`;
const useLoginWithPassword = (): any => {
  const { locale } = useIntl();
  const { selectedCurrency } = useAppContext();

  const [logInWithPasswordMutation, { error }] = useMutation(
    LoginWithPasswordMutation,
    {
      errorPolicy: 'all',
    },
  );

  const logInWithPassword = async ({
    username = '',
    email,
    password,
  }): Promise<any> => {
    const normalizedEmail = email?.trim();

    const variables = {
      username,
      email: normalizedEmail,
      forceLocale: locale,
      plainPassword: password,
      password: null,
      currency: selectedCurrency,
    };

    return logInWithPasswordMutation({
      variables,
    });
  };

  return {
    logInWithPassword,
    error,
  };
};
export default useLoginWithPassword;
