import { gql } from '@apollo/client';

const SimpleProductPrice = gql`
  fragment SimpleProductPrice on SimpleProduct {
    simulatedPrice(currency: $currency) {
      _id
      isTaxable
      isNetPrice
      amount
      currency
    }
  }
`;

export default SimpleProductPrice;
