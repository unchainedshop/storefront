import { gql, useMutation } from '@apollo/client';

const ChangeCartCurrencyMutation = gql`
  mutation ChangeCartCurrency($currency: String!) {
    changeCartCurrency(currency: $currency) {
      _id
    }
  }
`;

const useChangeCartCurrency = () => {
  const [changeCartCurrencyMutation] = useMutation(ChangeCartCurrencyMutation, {
    refetchQueries: ['user'],
  });

  const changeCartCurrency = async (currency) => {
    await changeCartCurrencyMutation({ variables: { currency } });
  };

  return {
    changeCartCurrency,
  };
};

export default useChangeCartCurrency;
