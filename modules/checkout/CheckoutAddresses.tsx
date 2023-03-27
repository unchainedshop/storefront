import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import AddressForm from './AddressForm';
import AddressPanel from './AddressPanel';

export const UPDATE_CART_BILLING_ADDRESS_MUTATION = gql`
  mutation UpdateCartBillingAddress($billingAddress: AddressInput) {
    updateCart(billingAddress: $billingAddress) {
      _id
      billingAddress {
        firstName
        lastName
        addressLine
        addressLine2
        postalCode
        city
        regionCode
        countryCode
      }
    }
  }
`;

export const UPDATE_ORDER_DELIVERY_ADDRESS_MUTATION = gql`
  mutation UpdateOrderDeliveryAddress(
    $orderDeliveryId: ID!
    $address: AddressInput
  ) {
    updateOrderDeliveryShipping(
      orderDeliveryId: $orderDeliveryId
      address: $address
    ) {
      _id
      address {
        firstName
        lastName
        addressLine
        addressLine2
        postalCode
        city
        regionCode
        countryCode
      }
    }
  }
`;

const EditableAddressPanel = ({ editing, address, onSubmit, onToggle }) => {
  if (editing)
    return (
      <AddressForm address={address} onSubmit={onSubmit} onCancel={onToggle} />
    );
  return <AddressPanel address={address} onEdit={onToggle} />;
};

const CheckoutAddresses = ({ cart, isInitial }) => {
  const [lastBillingAddress, setLastBillingAddress] = useState(null);
  const [billingAddressEditMode, setBillingAddressEditMode] = useState(false);
  const [deliveryAddressEditMode, setDeliveryAddressEditMode] =
    useState(isInitial);

  const [updateCartMutation] = useMutation(
    UPDATE_CART_BILLING_ADDRESS_MUTATION,
  );
  const [updateOrderDeliveryAddressMutation] = useMutation(
    UPDATE_ORDER_DELIVERY_ADDRESS_MUTATION,
  );

  const deliveryAddress = {
    ...(cart.delivery?.address || cart.billingAddress || {}),
  };
  if (deliveryAddress?.__typename !== undefined) {
    delete deliveryAddress.__typename;
  }

  const billingAddress = { ...(cart.billingAddress || {}) };
  if (billingAddress?.__typename !== undefined) {
    delete billingAddress.__typename;
  }

  const isBillingAddressDifferent = Boolean(cart.delivery?.address);

  const updateBillingAddress = async (address) => {
    await updateCartMutation({
      variables: {
        billingAddress: address,
      },
    });
    setLastBillingAddress(billingAddress);
    setBillingAddressEditMode(false);
  };

  const updateDeliveryAddress = async (address) => {
    if (isBillingAddressDifferent) {
      await updateOrderDeliveryAddressMutation({
        variables: {
          orderDeliveryId: cart.delivery._id,
          address,
        },
      });
    } else {
      await updateCartMutation({
        variables: {
          billingAddress: address,
        },
      });
    }
    setDeliveryAddressEditMode(false);
  };

  const toggleBillingAddress = async (event) => {
    if (!event.target.checked) {
      await Promise.all([
        updateCartMutation({
          variables: {
            billingAddress: lastBillingAddress || deliveryAddress,
          },
        }),
        updateOrderDeliveryAddressMutation({
          variables: {
            orderDeliveryId: cart.delivery._id,
            address: deliveryAddress,
          },
        }),
      ]);
    } else {
      // Billing Address should be the same as Delivery!
      await Promise.all([
        updateCartMutation({
          variables: {
            billingAddress: deliveryAddress,
          },
        }),
        updateOrderDeliveryAddressMutation({
          variables: {
            orderDeliveryId: cart.delivery._id,
            address: null,
          },
        }),
      ]);
      setBillingAddressEditMode(false);
    }
  };

  const toggleDeliveryAddressEditMode = () =>
    setDeliveryAddressEditMode(!deliveryAddressEditMode);
  const toggleBillingAddressEditMode = () =>
    setBillingAddressEditMode(!billingAddressEditMode);

  return (
    <>
      <div className="mb-6">
        <h2 className="text-lg font-medium">Delivery Address</h2>
        <EditableAddressPanel
          editing={deliveryAddressEditMode}
          address={deliveryAddress}
          onSubmit={updateDeliveryAddress}
          onToggle={toggleDeliveryAddressEditMode}
        />
      </div>

      <div className="mb-6" hidden={isInitial}>
        <h2 className="text-lg font-medium  mb-4">Billing Address</h2>
        <div className="flex items-center">
          <input
            id="isBillingAddressDifferent"
            type="checkbox"
            defaultChecked={!isBillingAddressDifferent}
            onChange={toggleBillingAddress}
            className="h-4 w-4 rounded border-stone-300 text-red-600 focus:ring-red-800"
          />
          <label
            htmlFor="isBillingAddressDifferent"
            className="ml-3 block text-sm font-medium text-brown-600"
          >
            Billing Address Same as Delivery
          </label>
        </div>
        {isBillingAddressDifferent && (
          <EditableAddressPanel
            editing={billingAddressEditMode}
            address={billingAddress}
            onSubmit={updateBillingAddress}
            onToggle={toggleBillingAddressEditMode}
          />
        )}
      </div>
    </>
  );
};

export default CheckoutAddresses;
