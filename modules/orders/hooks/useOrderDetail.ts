import { useQuery, gql } from '@apollo/client';

import OrderFragment from '../fragments/OrderFragment';
import OrderItemFragment from '../fragments/OrderItemFragment';

export const ORDER_DETAIL_QUERY = gql`
  query OrderDetailQuery($orderId: ID!) {
    order(orderId: $orderId) {
      ...OrderFragment
      items {
        ...OrderItemFragment
      }
    }
  }
  ${OrderFragment}
  ${OrderItemFragment}
`;

const useOrderDetail = ({ orderId }) => {
  const { data, loading, error, ...rest } = useQuery(ORDER_DETAIL_QUERY, {
    variables: { orderId },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'no-cache',
    ssr: false,
    skip: !orderId,
  });

  return {
    order: data?.order,
    loading,
    error,
    ...rest,
  };
};

export default useOrderDetail;
