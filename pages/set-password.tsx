import { useRouter } from 'next/router';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import useResetPassword from '../modules/auth/hooks/useResetPassword';
import MetaTags from '../modules/common/components/MetaTags';

const SetPasswordPage = () => {
  const router = useRouter();
  const intl = useIntl();
  const { token } = router.query;
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    watch,
  } = useForm<any>();
  const password = useRef({});

  password.current = watch('newPassword', '');
  const { resetPassword } = useResetPassword();

  const onSubmit = async ({ newPassword }) => {
    try {
      await resetPassword({ newPassword, token });
      router.replace('/account');
      return true;
    } catch (e: any) {
      setError('root', {
        message: e.message as string,
      });
    }
    return false;
  };

  return (
    <>
      <MetaTags
        title={intl.formatMessage({
          id: 'reset_password',
          defaultMessage: 'Reset Password',
        })}
      />
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <h1>
              {intl.formatMessage({
                id: 'reset_password',
                defaultMessage: 'Reset Password',
              })}
            </h1>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              <div
                className={`col-md-6 mb-3 ${
                  errors.password2 ? 'form-error' : ''
                }`}
              >
                <label className="form-label">
                  {intl.formatMessage({
                    id: 'new_password',
                    defaultMessage: 'New Password',
                  })}
                </label>
                <input
                  className="form-control"
                  type="password"
                  {...register('newPassword', { required: true })}
                />
              </div>
              <div
                className={`col-md-6 mb-3 ${
                  errors.password2 ? 'form-error' : ''
                }`}
              >
                <label className="form-label">
                  {intl.formatMessage({
                    id: 'repeat_password',
                    defaultMessage: 'Repeat password',
                  })}
                </label>
                <input
                  className="form-control"
                  type="password"
                  {...register('password2', {
                    validate: (value) =>
                      value === password.current ||
                      'The passwords do not match',
                  })}
                />
                {errors.password2 && (
                  <p>{errors.password2.message as string}</p>
                )}
              </div>
              {errors?.root?.message && (
                <ul className="form-error">
                  <li className="error-message">{errors.root.message}</li>
                </ul>
              )}
              <button
                className="button button--primary button--big mt-3"
                type="submit"
              >
                {intl.formatMessage({
                  id: 'reset_password',
                  defaultMessage: 'Set new password',
                })}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SetPasswordPage;
