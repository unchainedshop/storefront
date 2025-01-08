import { gql } from "@apollo/client";
import AddressFragment from "../../common/fragments/AddressFragment";
import ProductFragment from "../../products/fragments/ProductFragment";
import SimpleProductPrice from "../../products/fragments/SimpleProductPrice";

const CurrentUserFragment = gql`
  fragment CurrentUser on User {
    _id
    isGuest
    name
    username
    pushSubscriptions {
      endpoint
      _id
      userAgent
      expirationTime
    }
    emails {
      address
      verified
    }
    roles
    orders {
      _id
    }
    isInitialPassword
    lastLogin {
      timestamp
      countryCode
      locale
    }
    bookmarks {
      _id
      created
      product {
        ...ProductDetails
        ...SimpleProductPrice
      }
    }

    profile {
      phoneMobile
      address {
        ...AddressFragment
      }
    }
    cart {
      _id
      billingAddress {
        ...AddressFragment
      }

      contact {
        telNumber
        emailAddress
      }
      itemsTotal: total(category: ITEMS) {
        amount
        currency
      }
      items {
        _id
        quantity
        unitPrice {
          amount
          currency
        }
        total {
          amount
          currency
        }
        product {
          ...ProductDetails
          ...SimpleProductPrice
        }
      }
      paymentInfo: payment {
        _id
        status
        provider {
          _id
          type
          interface {
            _id
            label
            version
          }
        }
        ... on OrderPaymentGeneric {
          _id
        }
      }
      taxes: total(category: TAXES) {
        amount
        currency
      }
      delivery: total(category: DELIVERY) {
        amount
        currency
      }
      payment: total(category: PAYMENT) {
        amount
        currency
      }
      deliveryInfo: delivery {
        _id
        provider {
          _id
        }
        ... on OrderDeliveryShipping {
          address {
            ...AddressFragment
          }
        }
      }
      total {
        amount
        currency
      }
      currency {
        _id
        isoCode
      }
      supportedPaymentProviders {
        _id
        type
        interface {
          _id
          label
          version
        }
      }
      supportedDeliveryProviders {
        _id
        type
        interface {
          _id
          label
          version
        }
        simulatedPrice {
          amount
          currency
        }
      }
    }
  }
  ${ProductFragment}
  ${AddressFragment}
  ${SimpleProductPrice}
`;

export default CurrentUserFragment;
