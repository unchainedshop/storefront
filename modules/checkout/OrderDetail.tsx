import { useIntl } from "react-intl";
import { PrinterIcon } from "@heroicons/react/20/solid";
import OrderDetailItem from "./OrderDetailItem";

import OrderDetailBilling from "./OrderDetailBilling";
import OrderDetailPayment from "./OrderDetailPayment";
import OrderDetailDelivery from "./OrderDetailDelivery";

import OrderDetailHeader from "./OrderDetailHeader";
import useOrderStatusTypes from "../orders/hooks/useOrderStatusTypes";
import StatusProgress from "./StatusProgress";
import Button from "../common/components/Button";

const OrderDetail = ({ order }) => {
  const { orderStatusType } = useOrderStatusTypes();
  const { formatMessage } = useIntl();

  const timeline = {
    REJECTED: {
      id: 1,
      content: "rejected",
      visible: order?.status === "REJECTED",
    },
    CONFIRMED: {
      id: 2,
      content: "confirmed",
      visible: order?.status !== "REJECTED",
    },
    FULLFILLED: {
      id: 3,
      content: "fullfilled",
      visible: order?.status !== "REJECTED",
    },
  };

  const onPrint = () => {
    window.print();
  };

  return (
    <>
      <div className="print:hidden w-52  m-auto text-center">
        <Button
          text={formatMessage({
            id: "print",
            defaultMessage: "Print",
          })}
          className=" bg-black  sm:text-white text-white hover:bg-slate-700"
          type="button"
          onClick={onPrint}
          icon={<PrinterIcon className="h-5 w-5" />}
        />
      </div>

      <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-10 md:mt-10 dark:text-slate-200">
        <div>
          <OrderDetailHeader order={order} />
        </div>
        <div className="lg:col-span-2">
          <OrderDetailBilling order={order} />
        </div>

        <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-4 shadow dark:shadow-none rounded-md">
          <StatusProgress
            data={order}
            statusTypes={orderStatusType}
            timeline={timeline}
          />
        </div>

        <div>
          {order?.items.map((item) => {
            return <OrderDetailItem key={item._id} item={item} />;
          })}
        </div>
        <div>
          <OrderDetailDelivery order={order} />
        </div>
        <div>
          <OrderDetailPayment order={order} />
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
