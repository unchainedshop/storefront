import { useIntl } from 'react-intl';

import SignUpForm from '../modules/auth/components/SignUpForm';
import MetaTags from '../modules/common/components/MetaTags';
import useRedirect from '../modules/auth/hooks/useRedirect';

const SignUp = () => {
  const intl = useIntl();
  useRedirect({ to: '/account', matchUsers: true });

  return (
    <>
      <MetaTags
        title={intl.formatMessage({ id: 'sign_up', defaultMessage: 'Sign up' })}
      />
      <SignUpForm />
    </>
  );
};

export default SignUp;
