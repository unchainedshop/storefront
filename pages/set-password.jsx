import { useRouter } from 'next/router';
import { useState } from 'react';
import SetPasswordForm from '../modules/auth/components/SetPasswordForm';
import useSetPassword from '../modules/auth/hooks/useSetPassword';
import ErrorMessage from '../modules/common/components/ErrorMessage';

const ResetPassword = () => {
  const { query, ...router } = useRouter();
  const { setPassword } = useSetPassword();
  const [error, setError] = useState();

  const onSubmit = async ({ newPassword }) => {
    try {
      setError('');
      await setPassword({ newPassword });
      router.push('/');
    } catch (e) {
      if (e?.message?.match(/token does not exist/i)) {
        setError('Token existiert nicht oder ist abgelaufen');
      } else {
        setError(e.message);
      }
    }
  };

  return (
    <div className="flex min-h-screen justify-center bg-slate-100 dark:bg-slate-900 antialiased">
      <div className="container my-auto mt-24 max-w-md border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow rounded dark:shadow-none p-3 sm:mt-40">
        <div className="m-6 text-center">
          <h1 className="text-3xl font-semibold text-brown-600 dark:text-slate-200">
            Passwort festlegen
          </h1>
          <p className="text-slate-500 dark:text-slate-300">
            Legen Sie ein Passwort für Ihr Konto fest
          </p>
        </div>
        <div className="p-2">
          <SetPasswordForm onSubmit={onSubmit} />
        </div>
        <ErrorMessage message={error} />
      </div>
    </div>
  );
};

export default ResetPassword;

ResetPassword.getLayout = (page) => page;
