import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import toast from 'react-hot-toast';
import useCreateUser from '../hooks/useCreateUser';
import PasswordVisible from '../../common/components/PasswordVisible';

const SignUpForm = ({ children }) => {
  const { formatMessage } = useIntl();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm<any>();
  const { createUser } = useCreateUser();
  const password = useRef({});
  password.current = watch('password', '');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const onSubmit = async (form) => {
    try {
      await createUser(form);
      toast.success('User created successfully');
    } catch (error: any) {
      // eslint-disable-next-line no-console
      const firstGraphQLError = error?.graphQLErrors?.[0];
      if (firstGraphQLError?.extensions?.code === 'EmailAlreadyExists') {
        setError('root', {
          type: 'manual',
          message: `👬 ${formatMessage({
            id: 'email_exists_please_login',
            defaultMessage:
              'A User with the same email exists already. Please sign-in',
          })}`,
        });
      }
      console.error(error);
    }
  };

  return (
    <form
      className="space-y-6 md:grid md:grid-cols-6 md:gap-4 md:space-y-0"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="md:col-span-6">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          {formatMessage({ id: 'email', defaultMessage: 'Email' })}
        </label>
        <input
          type="email"
          autoComplete="email"
          {...register('email', {
            required: 'Email is required',
          })}
          className={classNames(
            'block w-full appearance-none rounded-md border py-2 px-3 placeholder-slate-400 shadow-sm transition focus:outline-none  dark:text-slate-600 sm:text-sm focus:text-slate-900 bg-slate-100',
            {
              'border-red-300 focus:border-red-600 focus:ring-red-600':
                errors.email,
              'border-slate-300 focus:border-slate-900 focus:ring-slate-900':
                !errors.email,
            },
          )}
        />
        {errors.email && (
          <p className="text-sm text-red-600">
            {errors.email?.message as string}
          </p>
        )}
      </div>

      <div className="md:col-span-6">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          {formatMessage({
            id: 'password',
            defaultMessage: 'Password',
          })}
        </label>
        <div className="relative mt-1">
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            {...register('password', {
              required: {
                value: true,
                message: 'Password is required',
              },
            })}
            autoComplete="new-password"
            className={classNames(
              'block w-full appearance-none rounded-md border py-2 px-3 placeholder-slate-400 shadow-sm transition focus:outline-none  dark:text-slate-600 sm:text-sm focus:text-slate-900 bg-slate-100',
              {
                'border-red-300 focus:border-red-600 focus:ring-red-600':
                  errors.password,
                'border-slate-300 focus:border-slate-900 focus:ring-slate-900':
                  !errors.password,
              },
            )}
          />

          <PasswordVisible
            isPasswordVisible={isPasswordVisible}
            setIsPasswordVisible={setIsPasswordVisible}
          />
          {errors.password && (
            <p className="text-sm text-red-600">
              {errors.password?.message as string}
            </p>
          )}
        </div>
      </div>

      <div className="md:col-span-6">
        {children}

        {errors.root?.message && (
          <div className="text-red-600">{errors.root.message as string}</div>
        )}
      </div>

      <div className="md:col-span-6">
        <button
          type="submit"
          className="flex w-full justify-center rounded-md border border-transparent bg-slate-900 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
        >
          {formatMessage({
            id: 'register',
            defaultMessage: 'Register',
          })}
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
