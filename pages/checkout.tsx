import { useIntl } from 'react-intl';
import Checkout from '../modules/checkout/Checkout';

import MetaTags from '../modules/common/components/MetaTags';

const CheckoutPage = () => {
  const intl = useIntl();

  return (
    <>
      <MetaTags
        title={intl.formatMessage({
          id: 'checkout',
          defaultMessage: 'Checkout',
        })}
      />
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <h1>
              {intl.formatMessage({
                id: 'checkout',
                defaultMessage: 'Checkout',
              })}
            </h1>
          </div>
          <Checkout />
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
