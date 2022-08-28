import { useQuery, gql } from '@apollo/client';

const SupportedCurrencies = gql`
  query SupportedCurrencies {
    currencies {
      _id
      isoCode
    }
  }
`;

const useSupportedCurrencies = () => {
  const { data, loading, error } = useQuery(SupportedCurrencies);

  const currencies = data?.currencies || [];

  return {
    currencies,
    loading,
    error,
  };
};

export default useSupportedCurrencies;
