import { useQuery, gql } from '@apollo/client';

export const ShopInfoQuery = gql`
  query ShopInfo {
    shopInfo {
      _id
      vapidPublicKey
      version
      oauthProviders {
        clientId
        name
        scopes
        __typename
      }
    }
  }
`;

const useShopInfo = () => {
  const { data, loading, error } = useQuery(ShopInfoQuery);

  return {
    loading,
    error,
    shopInfo: data?.shopInfo,
  };
};

export default useShopInfo;
