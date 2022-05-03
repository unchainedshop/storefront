import { useIntl } from 'react-intl';

import Header from '../modules/layout/components/Header';
import LoginForm from '../modules/auth/components/LoginForm';
import Footer from '../modules/layout/components/Footer';
import MetaTags from '../modules/common/components/MetaTags';
import useRedirect from '../modules/auth/hooks/useRedirect';

const LogIn = () => {
  const { formatMessage } = useIntl();
  useRedirect({ to: '/account', matchUsers: true });
  return (
    <>
      <MetaTags
        title={formatMessage({ id: 'log_in', defaultMessage: 'Log In' })}
      />
      <Header />
      <div className="container">
        <div className="row -mx-4 flex flex-wrap">
          <div className="relative m-auto w-full px-4 md:max-w-1/2 md:flex-2">
            <h1 className="text-center dark:text-white">
              {formatMessage({ id: 'log_in', defaultMessage: 'Log In' })}
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
