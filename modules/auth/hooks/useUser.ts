import { useQuery, gql } from '@apollo/client';
import { useAppContext } from '../../common/components/AppContextWrapper';

import CurrentUserFragment from '../fragments/CurrentUserFragment';

export const UserQuery = gql`
  query user {
    me {
      ...CurrentUserFragment
    }
  }
  ${CurrentUserFragment}
`;

const useUser = () => {
  const { selectedCurrency } = useAppContext();

  const { data, loading, error, refetch } = useQuery(UserQuery, {
    variables: {
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
