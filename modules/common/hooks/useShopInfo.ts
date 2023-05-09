import { useQuery, gql } from '@apollo/client';

export const SHOP_INFO_QUERY = gql`
  query ShopInfo {
    shopInfo {
      _id
      vapidPublicKey
      version
      oAuthProviders {
        _id
        clientId
        scopes
        __typename
      }
    }
  }
`;

const useShopInfo = () => {
  const { data, loading, error } = useQuery(SHOP_INFO_QUERY);

  return {
    loading,
    error,
    shopInfo: data?.shopInfo,
  };
};

export default useShopInfo;
