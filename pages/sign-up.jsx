import { useIntl } from 'react-intl';

import SignUpForm from '../modules/auth/components/SignUpForm';
import MetaTags from '../modules/common/components/MetaTags';
import Footer from '../modules/layout/components/Footer';
import Header from '../modules/layout/components/Header';
import useRedirect from '../modules/auth/hooks/useRedirect';

const SignUp = () => {
  const intl = useIntl();
  useRedirect({ to: '/account', matchUsers: true });

  return (
    <>
      <MetaTags title={intl.formatMessage({ id: 'sign_up' })} />
      <Header />
      <SignUpForm />
      <Footer />
    </>
  );
};

export default SignUp;
