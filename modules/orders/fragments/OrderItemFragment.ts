import { gql } from "@apollo/client";

const OrderItemFragment = gql`
  fragment OrderItemDetails on OrderItem {
    _id
    product {
      _id
      texts {
        _id
        slug
        brand
        vendor
        title
        subtitle
      }
      media {
        _id
        file {
          _id
          url
        }
      }
    }
    quantity

    unitPrice {
      amount
      isTaxable
      isNetPrice
      currency
    }
    total {
      amount
      isTaxable
      isNetPrice
      currency
    }
  }
`;

export default OrderItemFragment;
