import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Toggle from '../../common/components/Toggle';
import useCreateUser from '../hooks/useCreateUser';

import useGenerateWebAuthCredentials from '../hooks/useGenerateWebAuthCredentials';

const SignUpForm = () => {
  const router = useRouter();
  const { generateWebAuthCredentials } = useGenerateWebAuthCredentials();
  const [username, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);
  const { createUser } = useCreateUser();

  const isAuthenticatorActive = router?.query?.authenticator === '1';

  const onToggleAuthenticator = () => {
    if (!isAuthenticatorActive)
      return router.push({ query: { ...router.query, authenticator: '1' } });
    const { authenticator, ...queryWithoutAuthenticator } = router.query;
    router.push({ query: queryWithoutAuthenticator });
    return null;
  };

  const registerWithWebAuth = async (name) => {
    const webAuthnPublicKeyCredentials = await generateWebAuthCredentials({
      username: name,
    });

    const { data } = await createUser({
      username,
      webAuthnPublicKeyCredentials,
    });

    if (data && data?.createUser && data.createUser?.id) {
      router.push('/');
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      if (isAuthenticatorActive) {
        await registerWithWebAuth(username);
        return true;
      }

      const { data } = await createUser({
        username,
        email,
        password,
      });
      const { id } = data.createUser;
      if (id) {
        setError(null);
        router.push('/');
        return true;
      }
      return false;
    } catch (e) {
      if (error?.message?.toLowerCase().includes('email already exists'))
        setError('Email already exists');
      else if (
        error?.message?.includes('challenge mismatch') ||
        error?.message?.includes('already exists')
      )
        setError('Username taken, Please provided different username');
      else if (e.message.includes('The operation either timed'))
        setError('Operation timed out, please try again.');
      else setError(e.message);
    }

    return false;
  };

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white dark:bg-slate-500">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold  dark:text-slate-200">
            Account erstellen
          </h2>
        </div>
        <form
          onSubmit={onSubmit}
          className="mt-8 space-y-6 pt-4 pb-8 shadow sm:rounded-lg sm:px-10"
        >
          <input type="hidden" name="remember" value="true" />
          <div className="space-y-6">
            {isAuthenticatorActive && (
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-brown-600"
                >
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  onChange={(e) => setUserName(e.target.value)}
                  value={username || ''}
                  required={isAuthenticatorActive}
                  type="text"
                  label="Username"
                  autoComplete="username"
                  className="bg-beige mt-1 block w-full appearance-none rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-800 sm:text-sm"
                />
              </div>
            )}
            {!isAuthenticatorActive && (
              <>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-brown-600"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email || ''}
                    required
                    label="Email"
                    className="bg-beige mt-1 block w-full appearance-none rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-800 sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-brown-600"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password || ''}
                    autoComplete="current-password"
                    required
                    label="Password"
                    className="bg-beige mt-1 block w-full appearance-none rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-800 sm:text-sm"
                  />
                </div>
              </>
            )}
            <Toggle
              onToggle={onToggleAuthenticator}
              active={isAuthenticatorActive}
              label="Use authenticator"
              className="my-3 flex items-center"
            />
            <p className="text-sm text-slate-500 dark:text-white">
              Authenticator give you a simple and secure way to sign in without
              passwords by relying on Face ID or Touch ID using your phone or
              external Passkeys eg. Apple passkey to identify you when you sign
              in.
              <a
                href="https://webauthn.guide/#intro"
                target="__blank"
                className="font-medium text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300"
              >
                {' '}
                More info
              </a>
            </p>
          </div>
          {error && <div className="mt-3 text-red-600">{error}</div>}

          <div className="my-2">
            <button
              type="submit"
              className="flex w-full justify-center rounded-md border border-transparent bg-slate-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-red-500 group-hover:text-red-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Sign up
            </button>
          </div>

          <div className="text-sm text-slate-800 dark:text-slate-800">
            Already got a user?
            <Link href="/login" legacyBehavior>
              <a className=" ml-2 font-medium text-slate-600 hover:text-slate-500 dark:text-slate-800 dark:hover:text-slate-700">
                Log in
              </a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
