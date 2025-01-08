import dynamic from "next/dynamic";

import { FormattedMessage, defineMessages, useIntl } from "react-intl";
import CryptopayCheckoutButton from "./CryptopayCheckoutButton";
import InvoiceCheckoutButton from "./InvoiceCheckoutButton";
import DatatransCheckoutButton from "./DatatransCheckoutButton";
import useUpdateCartPayment from "../cart/hooks/useUpdateCartPayment";

const StripeCheckoutButton = dynamic(() => import("./StripeCheckoutButton"), {
  ssr: false,
});

const CheckoutButtons = {
  "shop.unchained.payment.cryptopay": CryptopayCheckoutButton,
  "shop.unchained.invoice": InvoiceCheckoutButton,
  "shop.unchained.invoice-prepaid": InvoiceCheckoutButton,
  "shop.unchained.datatrans": DatatransCheckoutButton,
  "shop.unchained.payment.stripe": StripeCheckoutButton,
};

const PaymentLabels = defineMessages({
  "shop.unchained.payment.cryptopay": {
    id: "shop.unchained.payment.cryptopay",
    defaultMessage: "Cryptocurrencies",
  },
  "shop.unchained.invoice": {
    id: "shop.unchained.invoice",
    defaultMessage: "Invoice Post-Paid",
  },
  "shop.unchained.invoice-prepaid": {
    id: "shop.unchained.invoice-prepaid",
    defaultMessage: "Invoice Pre-Paid",
  },
  "shop.unchained.datatrans": {
    id: "shop.unchained.datatrans",
    defaultMessage: "Online Payment Gateway (Datatrans)",
  },
  "shop.unchained.payment.stripe": {
    id: "shop.unchained.payment.stripe",
    defaultMessage: "Online Payment Gateway (Stripe)",
  },
});

const CheckoutPaymentMethod = ({ cart, disabled = false }) => {
  const { updateCartPayment } = useUpdateCartPayment();
  const { formatMessage } = useIntl();

  const setPaymentProvider = async (event) => {
    const formData = new FormData(event.target.form);
    const paymentProviderId = formData.get("paymentProviderId");
    try {
      await updateCartPayment({
        paymentProviderId,
      });
    } catch (e) {
      event.target.form.reset();
    }
  };

  const interfaceId = cart.payment?.provider?.interface?._id;
  const CheckoutButton = CheckoutButtons[interfaceId] ?? (() => null);

  return (
    <div className="mt-6">
      <form>
        <h2 className="text-lg font-medium  mb-4">
          {formatMessage({
            id: "payment-method",
            defaultMessage: "Payment method",
          })}
        </h2>
        <div className="space-y-4">
          {cart.supportedPaymentProviders.map((provider) => (
            <div className="flex items-center" key={provider._id}>
              <input
                type="radio"
                id={provider._id}
                name="paymentProviderId"
                value={provider._id}
                defaultChecked={cart.payment?.provider?._id === provider._id}
                onChange={setPaymentProvider}
                className="h-4 w-4 border-slate-300 text-red-600 focus:ring-red-800"
              />
              <label
                htmlFor={provider._id}
                className="ml-3 block text-sm font-medium text-brown-600"
              >
                <FormattedMessage {...PaymentLabels[provider.interface._id]} />
              </label>
            </div>
          ))}
        </div>
      </form>
      {!disabled && <CheckoutButton order={cart} />}
    </div>
  );
};

export default CheckoutPaymentMethod;
