import classNames from 'classnames';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import dynamic from 'next/dynamic';
import useGenerateLoginCredentials from '../hooks/useGenerateLoginCredentials';
import useLoginWithPassword from '../hooks/useLoginWithPassword';

import useLoginWithWebAuthn from '../hooks/useLoginWithWebAuthn';

const GoogleOauth = dynamic(() => import('./GoogleOauth'), {
  ssr: false,
});

const GetCurrentStep = ({
  step,
  usernameOrEmail,
  setUsernameOrEmail,
  password,
  setPassword,
}) => {
  switch (parseInt(step, 10)) {
    case 2:
      return (
        <div className="bg-amber-50">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-brown-600"
          >
            Password
          </label>
          <div className="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              autoFocus // eslint-disable-line
              autoComplete="current-password password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-beige block w-full appearance-none rounded-md border border-stone-300 px-3 py-2 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-800 sm:text-sm"
            />
          </div>
        </div>
      );
    default:
      return (
        <div>
          <label
            htmlFor="username-or-email"
            className="block text-sm font-medium text-brown-600"
          >
            Username / Email
          </label>
          <div className="mt-1">
            <input
              id="username-or-email"
              name="usernameOrEmail"
              className="bg-beige block w-full appearance-none rounded-md border border-stone-300 px-3 py-2 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-800 sm:text-sm"
              type="text"
              autoComplete="email username"
              required
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
            />
          </div>
        </div>
      );
  }
};

const LogInForm = () => {
  const router = useRouter();
  const { logInWithPassword } = useLoginWithPassword();
  const { loginWithWebAuthn } = useLoginWithWebAuthn();
  const [showPasswordNav, setShowPasswordNav] = useState(false);
  const [error, setError] = useState(null);
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const step = parseInt(router.query.step, 10) || 1;

  const nextStep = () => {
    setError(null);
    setShowPasswordNav(false);
    router.push({
      query: {
        step: step + 1,
      },
    });
  };

  const previousStep = () => {
    setError(null);
    setShowPasswordNav(false);
    router.push({
      query: {
        step: step - 1,
      },
    });
  };

  const { generateLoginCredentials } = useGenerateLoginCredentials();

  const handleError = (formError) => {
    const message = formError?.message?.toLowerCase();
    if (message.includes('invalid credentials')) {
      setError('Invalid credential, please try again');
    } else if (message.includes('no password set')) {
      setError('User password not set');
    } else if (message.includes('operation either timed out')) {
      setShowPasswordNav(true);
      setError('Operation timed out, please try again.');
    } else if (message.includes('you have provided all required parameters')) {
      setError('Email is required when logging in with password');
    } else {
      setError(message);
    }
  };

  const logInWithWebAuth = async (username) => {
    const webAuthnPublicKeyCredentials = await generateLoginCredentials({
      username,
    });
    if (webAuthnPublicKeyCredentials) {
      const { data } = await loginWithWebAuthn({
        webAuthnPublicKeyCredentials,
      });
      if (data && data?.loginWithWebAuthn) {
        router.push('/');
        return true;
      }
    }

    return false;
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    let data;
    try {
      if (step === 1) {
        const success = await logInWithWebAuth(usernameOrEmail);
        if (!success) {
          nextStep();
          return false;
        }
      } else if (step === 2) {
        data = await logInWithPassword({
          usernameOrEmail,
          password,
          disableHashing: true,
        });
      }
    } catch (e) {
      handleError(e);
      return false;
    }

    if (!data?.errors?.length) {
      router.push('/');
      return true;
    }
    handleError(data.errors[0]);
    return false;
  };

  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight ">
            Anmelden
          </h2>
          <p className="mt-2 text-center text-sm text-stone-600">
            Hast du dein
            <Link href="/forgot-password" legacyBehavior>
              <a className="ml-1 font-medium text-red-600 hover:text-red-500">
                Passwort vergessen?
              </a>
            </Link>
          </p>
        </div>
        {step > 1 && (
          <button
            type="button"
            id="previous-button"
            name="previous-button"
            onClick={previousStep}
            className="text-red-600 text-sm mx-auto block mt-5"
          >
            ← Back
          </button>
        )}

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md bg-amber-50">
          <div
            className={classNames('py-8 px-4 shadow sm:rounded-lg sm:px-10')}
          >
            <div className="space-y-6 sm:rounded-lg">
              <form onSubmit={onSubmit}>
                <GetCurrentStep
                  step={step}
                  {...{
                    usernameOrEmail,
                    setUsernameOrEmail,
                    password,
                    setPassword,
                  }}
                />
                {error && <div className="mt-3 text-red-600">{error}</div>}
                {showPasswordNav && (
                  <p className="text-center font-extrabold text-red-700 cursor-pointer">
                    <button type="button" onClick={nextStep}>
                      Or Use password to authenticate
                    </button>
                  </p>
                )}
                <div className="mt-4">
                  <input
                    type="submit"
                    id="submit"
                    name="submit"
                    value="Continue"
                    className="flex w-full justify-center rounded-md border border-transparent bg-red-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-offset-2"
                  />
                </div>
              </form>
              <div className="text-sm text-stone-400 dark:text-stone-200">
                Hast du keinen Account?
                <Link href="/sign-up" legacyBehavior>
                  <a className="ml-1 font-medium text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300">
                    Jetzt Registrieren
                  </a>
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-stone-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-amber-50 px-2 text-stone-500">
                    Oder weiter mit
                  </span>
                </div>
              </div>
              <div>
                <GoogleOauth />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogInForm;
