import { gql } from '@apollo/client';

const ProductFragment = gql`
  fragment ProductFragment on Product {
    _id
    media {
      _id
      file {
        _id
        name
        url
      }
    }
    reviews {
      _id
      created
      deleted
      updated

      rating
      title
      review
    }
    ... on PlanProduct {
      texts(forceLocale: $forceLocale) {
        _id
        title
        subtitle
        description
        slug
        labels
        vendor
        brand
      }
    }
    ... on SimpleProduct {
      texts(forceLocale: $forceLocale) {
        _id
        title
        subtitle
        description
        slug
        labels
        vendor
        brand
      }
      dimensions {
        width
        height
        length
        weight
      }
    }

    ... on BundleProduct {
      texts(forceLocale: $forceLocale) {
        _id
        title
        subtitle
        description
        slug
        labels
        vendor
        brand
      }
      bundleItems {
        product {
          _id
          media {
            _id
            file {
              _id
              name
              url
            }
          }
          reviews {
            _id
            created
            deleted
            updated
            author {
              _id
              username
            }
            rating
            title
            review
          }
        }
      }
    }
    ... on ConfigurableProduct {
      texts(forceLocale: $forceLocale) {
        _id
        title
        subtitle
        description
        slug
        labels
        vendor
        brand
      }
      variations {
        _id
        texts(forceLocale: $forceLocale) {
          _id
          title
          subtitle
        }
        type
        key
        options {
          _id
          texts(forceLocale: $forceLocale) {
            _id
            title
            subtitle
          }
          value
        }
      }
    }
  }
`;

export default ProductFragment;
