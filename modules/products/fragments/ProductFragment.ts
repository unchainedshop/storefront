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
      author {
        _id
        username
      }
      rating
      title
      review
    }
    ... on SimpleProduct {
      simulatedPrice {
        _id
        isTaxable
        isNetPrice
        amount
        currency
      }
      dimensions {
        width
        height
        length
        weight
      }
      texts(forceLocale: $forceLocale) {
        _id
        title
        subtitle
        description
        slug
      }
    }
    ... on PlanProduct {
      texts(forceLocale: $forceLocale) {
        _id
        title
        subtitle
        description
        slug
      }
    }
    ... on BundleProduct {
      texts(forceLocale: $forceLocale) {
        _id
        title
        subtitle
        description
        slug
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
