import { useIntl } from 'react-intl';
import Image from 'next/legacy/image';
import getConfig from 'next/config';
import defaultNextImageLoader from '../modules/common/utils/defaultNextImageLoader';

import SignUpForm from '../modules/auth/components/SignUpForm';
import MetaTags from '../modules/common/components/MetaTags';
import useRedirect from '../modules/auth/hooks/useRedirect';

const {
  publicRuntimeConfig: { theme },
} = getConfig();

const SignUp = () => {
  const intl = useIntl();
  useRedirect({ to: '/account', matchUsers: true });

  return (
    <>
      <MetaTags
        title={intl.formatMessage({ id: 'sign_up', defaultMessage: 'Sign up' })}
      />
      <div className="bg-slate-100 dark:bg-slate-600 lg:grid lg:grid-cols-2">
        <div className="flex flex-col justify-center py-6 px-2 sm:px-3 lg:flex-none lg:px-10 xl:px-12">
          <div className="mx-auto w-full rounded-lg border border-slate-200 bg-white px-2 py-6 drop-shadow-lg dark:bg-slate-500 sm:px-3 lg:px-10 xl:px-12">
            <div>
              <h2 className="mt-6 text-3xl font-extrabold text-slate-900 dark:text-slate-100">
                {intl.formatMessage({
                  id: 'sign_up',
                  defaultMessage: 'Sign up',
                })}
              </h2>
            </div>

            <div className="mt-8">
              <div className="mt-6">
                <SignUpForm />
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden py-6 lg:block">
          <div className="relative h-full w-full opacity-50">
            <span>
              <Image
                src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
                alt=""
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                placeholder="blur"
                blurDataURL="/placeholder.png"
                className="z-0 rounded-lg"
                loader={defaultNextImageLoader}
              />
            </span>
          </div>
          <span className="absolute top-1/3 left-1/3">
            <Image
              src={theme.assets.logo}
              alt={intl.formatMessage({
                id: 'shop_logo_sign_up',
                defaultMessage: 'Shop logo',
              })}
              layout="fixed"
              width={144}
              height={40}
              placeholder="blur"
              blurDataURL="/placeholder.png"
              className="mx-auto rounded"
              loader={defaultNextImageLoader}
            />
          </span>
        </div>
      </div>
    </>
  );
};

export default SignUp;
