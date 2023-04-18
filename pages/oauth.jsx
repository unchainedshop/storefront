import { XCircleIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useLogInWithOAuth from '../modules/auth/hooks/useLoginWithOAuth';
import Loading from '../modules/common/components/Loading';

const Oauth = () => {
  const { logInWithOAuth } = useLogInWithOAuth();
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const asyncLogin = async () => {
      if (router.query.code) {
        try {
          await logInWithOAuth({
            authorizationCode: router.query.code,
            provider: router.query.state,
            redirectUrl: 'http://localhost:3000/oauth',
          });
          router.push('/');
        } catch (e) {
          setError(e.message);
        }
      }
    };
    asyncLogin();
  }, [router.query]);

  return error ? (
    <div className="flex items-center justify-center min-h-screen p-5 dark:bg-slate-500 min-w-screen">
      <div className="max-w-xl p-8 text-center  bg-white shadow-xl lg:max-w-3xl rounded-3xl lg:p-12  text-red-800">
        <h3 className="text-2xl  text-red-400">
          {error ? 'Oauth failed' : null}
        </h3>
        <div className="flex justify-center">
          <XCircleIcon
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-24 h-24 text-red-400"
          />
        </div>

        <p className=" text-red-400">{error}</p>
        <div className="mt-4">
          <Link
            href="/login"
            className="px-4 mr-2 py-2 text-white bg-slate-800 rounded"
          >
            Go to Log in
          </Link>
          <Link href="/" className="px-4 py-2 text-white bg-slate-800 rounded">
            Go to home
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Oauth;
