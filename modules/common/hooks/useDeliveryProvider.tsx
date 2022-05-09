import { useQuery, gql } from '@apollo/client';

export const DeliveryProvidersQuery = gql`
  query DeliveryProvidersQuery($type: DeliveryProviderType) {
    deliveryProviders(type: $type) {
      _id
      isActive
      created
      updated
      deleted
      type
      interface {
        _id
        label
        version
      }
    }
  }
`;

const useDeliveryProviders = ({ type = null } = {}) => {
  const { data, loading, error } = useQuery(DeliveryProvidersQuery, {
    variables: { type },
  });

  return {
    loading,
    error,
    deliveryProviders: data?.deliveryProviders || [],
  };
};

export default useDeliveryProviders;
