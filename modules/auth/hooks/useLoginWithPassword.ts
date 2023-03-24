import { useMutation, gql } from '@apollo/client';
import { useIntl } from 'react-intl';
import { useAppContext } from '../../common/components/AppContextWrapper';

import CurrentUserFragment from '../fragments/CurrentUserFragment';

const LoginWithPasswordMutation = gql`
  mutation LoginWithPassword(
    $email: String!
    $plainPassword: String
    $currency: String
  ) {
    loginWithPassword(email: $email, plainPassword: $plainPassword) {
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
      plainPassword: password,
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
