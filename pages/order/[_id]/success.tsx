import { useRouter } from "next/router";
import { useIntl } from "react-intl";

import MetaTags from "../../../modules/common/components/MetaTags";
import useOrderDetail from "../../../modules/orders/hooks/useOrderDetail";
import NotFound from "../../404";
import useRedirect from "../../../modules/auth/hooks/useRedirect";
import Loading from "../../../modules/common/components/Loading";
import OrderDetail from "../../../modules/checkout/OrderDetail";
import { useAppContext } from "../../../modules/common/components/AppContextWrapper";

const OrderSuccessTankYouPage = () => {
  const router = useRouter();
  const { emailSupportDisabled } = useAppContext();
  const intl = useIntl();
  const { order, loading } = useOrderDetail({
    orderId: router.query?._id,
  });

  useRedirect({ to: "/login", matchGuests: false, matchAnonymous: true });

  if (!order && !loading)
    return (
      <NotFound
        page={intl.formatMessage({ id: "order", defaultMessage: "Order" })}
      />
    );

  return (
    <>
      <MetaTags
        title={`${intl.formatMessage(
          { id: "order_numbered", defaultMessage: "Order: {orderNumber}" },
          {
            orderNumber: order?.orderNumber,
          },
        )}`}
      />
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className="bg-white p-8 rounded-lg shadow-md text-center print:hidden">
            <h1 className="text-2xl font-semibold text-gray-800">
              Order Confirmation
            </h1>
            <p className="text-gray-600 mt-4">
              Thank you for choosing Unchained Commerce!
            </p>
            <p className="text-gray-600">
              Your order has been received and is now being processed with care.
            </p>
            <p className="text-gray-600">
              Should you have any questions or need further assistance, please
              don&apos;t hesitate to reach out to our dedicated customer support
              team.
            </p>
            {!emailSupportDisabled && (
              <p className="text-gray-600">
                You&apos;ll receive an email confirmation shortly with all the
                details of your order.
              </p>
            )}
            <p className="text-gray-600 mt-2">
              For your convenience, we recommend printing this page as a record
              of your order.
            </p>
          </div>
          <OrderDetail order={order} />
        </div>
      )}
    </>
  );
};

export default OrderSuccessTankYouPage;
