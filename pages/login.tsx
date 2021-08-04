import { useIntl } from 'react-intl';

import Header from '../modules/layout/components/Header';
import LoginForm from '../modules/auth/components/LoginForm';
import Footer from '../modules/layout/components/Footer';
import MetaTags from '../modules/common/components/MetaTags';
import useRedirect from '../modules/auth/hooks/useRedirect';

const LogIn = () => {
  const intl = useIntl();
  useRedirect({ to: '/account', matchUsers: true });
  return (
    <>
      <MetaTags title={intl.formatMessage({ id: 'log_in' })} />
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-6 m-auto">
            <h1 className="text-center">
              {intl.formatMessage({ id: 'log_in' })}
            </h1>
            <LoginForm />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LogIn;
