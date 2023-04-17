import ForgotPasswordForm from '../modules/auth/components/ForgotPasswordForm';
import useForgotPassword from '../modules/auth/hooks/useForgotPassword';

const ForgotPassword = () => {
  const { forgotPassword } = useForgotPassword();
  const onSubmit = async ({ email }) => {
    const { data } = await forgotPassword({ email });
    return data.forgotPassword;
  };

  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight ">
          Forgot your password?
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Enter your email address below and we&apos;ll send you an email with a
          link to reset your password!
        </p>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <ForgotPasswordForm onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

ForgotPassword.getLayout = (page) => page;
