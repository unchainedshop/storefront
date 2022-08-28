import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';
import Link from 'next/link';

import MetaTags from '../modules/common/components/MetaTags';
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
      <MetaTags
        title={intl.formatMessage({
          id: 'email_verified_success',
          defaultMessage: 'Your email has been successfully verified',
        })}
      />
      <div className="mx-4 flex flex-wrap">
        <div className="relative w-full px-4 md:ml-[16.666667%] md:max-w-2/3 md:flex-6">
          {loading ? (
            <>
              <h1>
                {intl.formatMessage({
                  id: 'email_verifying',
                  defaultMessage: 'Verifying your email address',
                })}
                <br /> <br /> ...
              </h1>
            </>
          ) : (
            <>
              <h1>
                {intl.formatMessage({
                  id: 'email_verified_success',
                  defaultMessage: 'Your email has been successfully verified',
                })}
              </h1>
              <Link href="/">
                <a className="button button--secondary my-3">
                  {intl.formatMessage({
                    id: 'back_to_home',
                    defaultMessage: 'Back to Home',
                  })}
                </a>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default VerifiedEmail;
