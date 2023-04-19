import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import ImageWithFallback from '../../common/components/ImageWithFallback';
import Toggle from '../../common/components/Toggle';
import getLogo from '../../common/utils/getLogo';

import Form from '../../forms/components/Form';
import FormErrors from '../../forms/components/FormErrors';
import PasswordField from '../../forms/components/PasswordField';
import TextField from '../../forms/components/TextField';

import useForm from '../../forms/hooks/useForm';
import useCreateUser from '../hooks/useCreateUser';
import useGenerateWebAuthCredentials from '../hooks/useGenerateWebAuthCredentials';
import { storeLoginToken } from '../utils/store';

const SignUpForm = () => {
  const { formatMessage } = useIntl();
  const [authenticateWithDevice, setAuthenticateWithDevice] = useState(true);
  const { generateWebAuthCredentials } = useGenerateWebAuthCredentials();
  const { createUser } = useCreateUser();
  const { push } = useRouter();
  const registerWithWebAuth = async (username) => {
    const webAuthnPublicKeyCredentials = await generateWebAuthCredentials({
      username,
    });

    const { data } = await createUser({
      username,
      webAuthnPublicKeyCredentials,
    });

    if (data && data?.createUser) {
      const { id, token, tokenExpires } = data.createUser;
      await storeLoginToken(id, token, new Date(tokenExpires));
    }
  };

  const onSubmit = async ({ username, email, password }) => {
    if (authenticateWithDevice) {
      await registerWithWebAuth(username);
      return true;
    }

    const { data } = await createUser({
      username,
      email,
      password,
    });
    const { id, token, tokenExpires } = data.createUser;
    await storeLoginToken(id, token, new Date(tokenExpires));
    if (id) return true;

    return false;
  };

  const onSubmitSuccess = () => {
    push('/account');
  };
  const form = useForm({
    getSubmitErrorMessage: (error) => {
      if (error?.message?.toLowerCase().includes('email already exists'))
        return formatMessage({
          id: 'email_exists_error',
          defaultMessage: 'Email already exists',
        });
      if (
        error?.message?.includes('challenge mismatch') ||
        error?.message?.includes('already exists')
      )
        return formatMessage({
          id: 'username_or_email_taken',
          defaultMessage: 'Username taken, Please provided different username',
        });

      return error?.message || '';
    },
    submit: onSubmit,
    onSubmitSuccess,
    initialValues: {
      username: null,
      email: null,
      password: null,
    },
  });
  const logo = getLogo();
  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 text-center">
        <div>
          <ImageWithFallback
            className="mx-auto"
            src={logo}
            width={160}
            height={100}
            alt={formatMessage({
              id: 'unchained_logo',
              defaultMessage: 'Unchained Logo',
            })}
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 dark:text-slate-200">
            {formatMessage({
              id: 'sign_up_header',
              defaultMessage: 'Create new account',
            })}
          </h2>
        </div>

        <Form
          form={form}
          className="mt-8 space-y-6 pt-4 pb-8 shadow sm:rounded-lg sm:px-10"
        >
          <input type="hidden" name="remember" value="true" />
          <div className="space-y-6 rounded-md shadow-sm">
            <div>
              <TextField
                id="username"
                name="username"
                required={authenticateWithDevice}
                type="text"
                label={formatMessage({
                  id: 'username',
                  defaultMessage: 'Username',
                })}
              />
            </div>
            {!authenticateWithDevice && (
              <>
                <div>
                  <TextField
                    id="email"
                    name="email"
                    type="email"
                    required
                    label={formatMessage({
                      id: 'email',
                      defaultMessage: 'Email',
                    })}
                  />
                </div>
                <div>
                  <PasswordField
                    id="password"
                    name="password"
                    autoComplete="current-password"
                    required
                    label={formatMessage({
                      id: 'password',
                      defaultMessage: 'Password',
                    })}
                  />
                </div>
              </>
            )}
            <Toggle
              onToggle={() =>
                setAuthenticateWithDevice(!authenticateWithDevice)
              }
              toggleText={formatMessage({
                id: 'use_authenticator',
                defaultMessage: 'Use authenticator',
              })}
              className="ml-2 my-3"
              toggleKey="totp"
              active={authenticateWithDevice}
            />
          </div>
          <FormErrors />

          <div className="my-2">
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-slate-500 py-2 px-4 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-slate-500 group-hover:text-slate-400"
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

              {formatMessage({
                id: 'sign_up',
                defaultMessage: 'Sign up',
              })}
            </button>
          </div>

          <div className="text-sm text-slate-400 dark:text-slate-200">
            {formatMessage({
              id: 'already_got_a_user',
              defaultMessage: 'Already got a user?',
            })}
            <Link
              href="/login"
              className=" ml-2 font-medium text-slate-600 hover:text-slate-500 dark:text-slate-400 dark:hover:text-slate-300"
            >
              {formatMessage({
                id: 'log_in',
                defaultMessage: 'Log in',
              })}
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignUpForm;
