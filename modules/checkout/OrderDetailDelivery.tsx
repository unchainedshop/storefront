import { useIntl } from "react-intl";

import { getInterfaceLabel, useFormatPrice } from "../common/utils/utils";
import useDeliveryProviderTypes from "../orders/hooks/useDeliveryProviderTypes";
import useFormatDateTime from "../common/utils/useFormatDateTime";
import useDeliveryStatusTypes from "../orders/hooks/useDeliveryStatusTypes";
import StatusInformation from "../common/components/StatusInformation";

const OrderDetailDelivery = ({ order }) => {
  const { deliveryProviderType } = useDeliveryProviderTypes();
  const { deliveryStatusType } = useDeliveryStatusTypes();

  const { formatPrice } = useFormatPrice();
  const { formatMessage } = useIntl();
  const { formatDateTime } = useFormatDateTime();

  return (
    <div className="bg-white dark:bg-slate-800 shadow dark:shadow-none sm:rounded-lg">
      <div className="flex items-center justify-between px-4 sm:px-6">
        <h2 className="py-4 text-lg font-medium">
          {formatMessage({
            id: "delivered",
            defaultMessage: "Delivered",
          })}
        </h2>
        <span className="mr-2 block rounded-full py-1 text-xs font-semibold leading-5">
          {formatPrice(order?.delivery.fee)}
        </span>
        <span className="font-medium">
          {formatDateTime(order?.delivery?.delivered, {
            timeStyle: "short",
            dateStyle: "medium",
          })}
        </span>
      </div>
      <div className="border-t border-slate-50 dark:border-slate-700 px-4 py-4 sm:px-6">
        <span className="mb-5 block">
          <span className="font-medium text-slate-600 dark:text-slate-400 hover:text-slate-500 dark:hover:text-slate-300">
            {getInterfaceLabel(order?.delivery?.provider?.interface)}
          </span>
        </span>

        <div className="mt-3 text-sm font-medium text-slate-500 dark:text-slate-200">
          {formatMessage({
            id: "method",
            defaultMessage: "Method",
          })}
        </div>
        <span className="mr-2 block rounded-full py-1 text-xs font-semibold leading-5">
          {deliveryProviderType.map((type) => (
            <StatusInformation
              key={type.value}
              enumType={type.value}
              currentType={order?.delivery?.provider?.type}
              label={type.label}
            />
          ))}
        </span>

        <div className="mt-3 text-sm font-medium text-slate-500 dark:text-slate-200 print:hidden">
          {formatMessage({
            id: "status",
            defaultMessage: "Status",
          })}
        </div>
        <span className="mr-2 block rounded-full py-1 text-xs font-semibold leading-5 print:hidden">
          {deliveryStatusType.map((type) => (
            <StatusInformation
              key={type.value}
              enumType={type.value}
              currentType={order?.delivery?.status}
              label={type.label}
            />
          ))}
        </span>
      </div>
    </div>
  );
};

export default OrderDetailDelivery;
