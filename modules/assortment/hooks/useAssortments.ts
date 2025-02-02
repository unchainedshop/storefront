import { useQuery, gql } from "@apollo/client";
import AssortmentFragment from "../fragments/assortment";
import AssortmentMediaFragment from "../fragments/AssortmentMedia";

export const ASSORTMENTS_QUERY = gql`
  query AssortmentsQuery($includeLeaves: Boolean = false) {
    assortments(includeLeaves: $includeLeaves) {
      ...AssortmentFragment
      media {
        ...AssortmentMediaFragment
      }
    }
  }
  ${AssortmentFragment}
  ${AssortmentMediaFragment}
`;

const useAssortments = ({ includeLeaves = false } = {}) => {
  const { data, loading, error } = useQuery(ASSORTMENTS_QUERY, {
    variables: {
      includeLeaves,
    },
  });

  return {
    loading,
    error,
    assortments: data?.assortments || [],
  };
};

export default useAssortments;
