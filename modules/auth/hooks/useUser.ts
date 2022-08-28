import { useQuery, gql } from '@apollo/client';
import { useIntl } from 'react-intl';
import { useAppContext } from '../../common/components/AppContextWrapper';

import CurrentUserFragment from '../fragments/CurrentUserFragment';

export const UserQuery = gql`
  query user($forceLocale: String, $currency: String) {
    me {
      ...CurrentUserFragment
    }
  }
  ${CurrentUserFragment}
`;

const useUser = () => {
  const intl = useIntl();
  const { selectedCurrency } = useAppContext();

  const { data, loading, error, refetch } = useQuery(UserQuery, {
    variables: {
      forceLocale: intl.locale,
      currency: selectedCurrency,
    },
  });

  return {
    loading,
    error,
    user: data?.me,
    cart: data?.me?.cart,
    refetch,
  };
};

export default useUser;
