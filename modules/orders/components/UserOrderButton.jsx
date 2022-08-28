import { CollectionIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useIntl } from 'react-intl';

const OrderButton = () => {
  const { formatMessage } = useIntl();
  // if (orders.length === 0) return null;

  return (
    <Link href="/orders">
      <a className="flex items-center gap-x-2">
        <CollectionIcon className="h-6 w-6" />
        <span className="hidden lg:block">
          {formatMessage({ id: 'my_orders', defaultMessage: 'My orders' })}
        </span>
      </a>
    </Link>
  );
};

export default OrderButton;
