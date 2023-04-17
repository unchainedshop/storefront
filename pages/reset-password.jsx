import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import SetPasswordForm from '../modules/auth/components/SetPasswordForm';
import useResetPassword from '../modules/auth/hooks/useResetPassword';
import ErrorMessage from '../modules/common/components/ErrorMessage';

const ResetPassword = () => {
  const { query, ...router } = useRouter();
  const { resetPassword } = useResetPassword();
  const { token } = query;
  const [error, setError] = useState();

  const onSubmit = useCallback(
    async ({ newPassword }) => {
      try {
        setError('');
        await resetPassword({ newPlainPassword: newPassword, token });
        router.push('/');
      } catch (e) {
        if (e?.message?.match(/token does not exist/i)) {
          setError('Token existiert nicht oder ist abgelaufen');
        } else {
          setError(e.message);
        }
      }
    },
    [token],
  );

  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight ">
          Passwort zurücksetzen
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Legen Sie ein Passwort für Ihr Konto fest
        </p>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <SetPasswordForm onSubmit={onSubmit} />
        </div>
        <ErrorMessage message={error} />
      </div>
    </div>
  );
};

export default ResetPassword;

ResetPassword.getLayout = (page) => page;
