import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';
import Link from 'next/link';

import MetaTags from '../modules/common/components/MetaTags';
import Footer from '../modules/layout/components/Footer';
import Header from '../modules/layout/components/Header';
import useVerifyEmail from '../modules/auth/hooks/useVerifyEmail';
import useRedirect from '../modules/auth/hooks/useRedirect';

const VerifiedEmail = () => {
  const intl = useIntl();
  const router = useRouter();
  const { verifyEmail } = useVerifyEmail();
  const [loading, setLoading] = useState(true);

  const { token } = router.query;

  useRedirect({ to: '/account', matchUsers: true });

  useEffect(() => {
    verifyEmail({ token }).then(() => {
      setLoading(false);
    });
  }, [token]);

  return (
    <>
      <MetaTags title={intl.formatMessage({ id: 'email_verified_success' })} />
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            {loading ? (
              <>
                <h1>
                  {intl.formatMessage({ id: 'email_verifying' })}
                  <br /> <br /> ...
                </h1>
              </>
            ) : (
              <>
                <h1>{intl.formatMessage({ id: 'email_verified_success' })}</h1>
                <Link href="/">
                  <a className="button button--secondary my-3">
                    {intl.formatMessage({ id: 'back_to_home' })}
                  </a>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VerifiedEmail;
