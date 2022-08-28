import Link from 'next/link';
import { useIntl } from 'react-intl';
import useRedirect from '../modules/auth/hooks/useRedirect';
import useUser from '../modules/auth/hooks/useUser';
import ManageCart from '../modules/cart/components/ManageCart';

import Footer from '../modules/layout/components/Footer';
import LoadingItem from '../modules/common/components/LoadingItem';
import MetaTags from '../modules/common/components/MetaTags';

const Cart = () => {
  const intl = useIntl();
  const { user, loading } = useUser();

  useRedirect({ to: '/checkout', matchUsers: true });

  return (
    <>
      <MetaTags title={intl.formatMessage({ id: 'cart' })} />

      <div className="container">
        <div className="row">
          <div className="col-md-8 col-lg-6 mx-auto">
            <h1>{intl.formatMessage({ id: 'cart' })}</h1>
            {loading ? (
              <LoadingItem />
            ) : (
              <>
                <ManageCart user={user} />
                <div className="button-group mt-5">
                  <Link href={{ pathname: '/review' }}>
                    <a className="button button--primary button--big text-uppercase">
                      {intl.formatMessage({ id: 'to_checkout' })}
                    </a>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
