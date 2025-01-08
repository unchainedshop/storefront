import { useQuery, gql } from "@apollo/client";
import ProductFragment from "../../products/fragments/ProductFragment";
import SimpleProductPrice from "../../products/fragments/SimpleProductPrice";
import AssortmentFragment from "../fragments/assortment";
import AssortmentMediaFragment from "../fragments/AssortmentMedia";
import AssortmentPathFragment from "../fragments/AssortmentPath";

export const ASSORTMENT_PRODUCTS_QUERY = gql`
  query AssortmentsProducts($slugs: String!, $offset: Int, $limit: Int) {
    assortment(slug: $slugs) {
      ...AssortmentFragment
      assortmentPaths {
        ...AssortmentPathFragment
      }
      media {
        ...AssortmentMediaFragment
      }
      searchProducts {
        filteredProductsCount
        productsCount
        products(offset: $offset, limit: $limit) {
          ...ProductDetails
          ...SimpleProductPrice
        }
      }
    }
  }
  ${SimpleProductPrice}
  ${AssortmentFragment}
  ${ProductFragment}
  ${AssortmentPathFragment}
  ${AssortmentMediaFragment}
`;

const useAssortmentProducts = (
  {
    includeLeaves,
    slugs,
  }: { includeLeaves: boolean; slugs: string[] | string } = {
    includeLeaves: true,
    slugs: [],
  },
) => {
  const { data, loading, error, fetchMore } = useQuery(
    ASSORTMENT_PRODUCTS_QUERY,
    {
      variables: {
        includeLeaves,
        slugs,
        offset: 0,
        limit: 10,
      },
    },
  );
  const paths = (data?.assortment?.assortmentPaths || []).flat().pop()?.links;
  const products = data?.assortment?.searchProducts.products || [];
  const loadMore = () => {
    fetchMore({
      variables: {
        offset: products.length,
        includeLeaves,
        slugs,
        limit: 10,
      },
    });
  };

  return {
    loading,
    loadMore,
    error,
    filteredProducts: data?.assortment?.searchProducts.filteredProductsCount,
    assortment: data?.assortment || {},
    products,
    paths,
  };
};

export default useAssortmentProducts;
