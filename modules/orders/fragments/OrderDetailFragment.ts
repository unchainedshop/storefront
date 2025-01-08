import { gql } from "@apollo/client";
import OrderItemFragment from "./OrderItemFragment";

const OrderDetailFragment = gql`
  fragment OrderDetailFragment on Order {
    _id
    totalTax: total(category: TAXES) {
      amount
      currency
    }
    itemsTotal: total(category: ITEMS) {
      amount
      currency
    }
    totalDiscount: total(category: DISCOUNTS) {
      amount
      currency
    }

    totalPayment: total(category: PAYMENT) {
      amount
      currency
    }
    totalDelivery: total(category: DELIVERY) {
      amount
      currency
    }

    user {
      _id
      username
      isGuest
      avatar {
        _id
        url
      }
    }
    discounts {
      _id
      trigger
      code
      interface {
        _id
        label
        version
      }
      total {
        amount
        currency
        isTaxable
        isNetPrice
      }
      discounted {
        _id
        orderDiscount {
          _id
          total {
            amount
            currency
            isTaxable
            isNetPrice
          }
        }
        total {
          amount
          currency
          isTaxable
          isNetPrice
        }
      }
    }
    payment {
      _id
      provider {
        _id
        type
        interface {
          _id
          label
          version
        }
      }
      status
      fee {
        currency
        amount
      }
      paid
    }

    orderNumber
    status
    created
    updated
    ordered

    confirmed
    fullfilled
    contact {
      telNumber
      emailAddress
    }
    country {
      _id
      isoCode
      flagEmoji
      name
    }
    currency {
      _id
      isoCode
      isActive
    }
    billingAddress {
      firstName
      lastName
      company
      addressLine
      addressLine2
      postalCode
      countryCode
      regionCode
      city
    }
    delivery {
      _id
      provider {
        _id
        created
        updated
        deleted
        type
        configuration
        interface {
          _id
          label
          version
        }
      }
      status
      delivered
      fee {
        isTaxable
        isNetPrice
        amount
        currency
      }
      discounts {
        _id
        orderDiscount {
          _id
          trigger
          code
          order {
            _id
            orderNumber
          }
          interface {
            _id
            label
            version
          }
          total {
            isTaxable
            isNetPrice
            amount
            currency
          }
          discounted {
            _id
            orderDiscount {
              _id
              trigger
              code
              order {
                _id
                orderNumber
              }
              interface {
                _id
                label
                version
              }
              total {
                isTaxable
                isNetPrice
                amount
                currency
              }
            }
          }
        }
      }
    }
    total {
      isTaxable
      amount
      currency
    }
    items {
      _id
      ...OrderItemDetails
    }
  }
  ${OrderItemFragment}
`;

export default OrderDetailFragment;
