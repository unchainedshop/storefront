import { useQuery, gql } from "@apollo/client";

import AssortmentFragment from "../fragments/assortment";
import AssortmentPathFragment from "../fragments/AssortmentPath";

export const ASSORTMENT_PATHS_QUERY = gql`
  query AssortmentPathsQuery($assortmentId: ID!) {
    assortment(assortmentId: $assortmentId) {
      ...AssortmentFragment
      assortmentPaths {
        ...AssortmentPathFragment
      }
    }
  }
  ${AssortmentFragment}
  ${AssortmentPathFragment}
`;

const useAssortmentPaths = ({ assortmentId }) => {
  const { data, loading, error } = useQuery(ASSORTMENT_PATHS_QUERY, {
    variables: {
      assortmentId,
    },
  });

  return {
    loading,
    error,
    assortment: data?.assortment,
  };
};

export default useAssortmentPaths;
