import { useQuery, gql } from "@apollo/client";

import OrderFragment from "../fragments/OrderFragment";

export const USER_ORDERS_QUERY = gql`
  {
    me {
      _id
      orders {
        ...OrderFragment
      }
    }
  }
  ${OrderFragment}
`;

const useOrderList = () => {
  const { data, loading, error } = useQuery(USER_ORDERS_QUERY);

  return {
    orders: data?.me?.orders || [],
    loading,
    error,
  };
};

export default useOrderList;
