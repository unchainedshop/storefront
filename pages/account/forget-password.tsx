import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import useForgotPassword from '../../modules/auth/hooks/useForgotPassword';
import LoadingItem from '../../modules/common/components/LoadingItem';
import MetaTags from '../../modules/common/components/MetaTags';
import Footer from '../../modules/layout/components/Footer';
import Header from '../../modules/layout/components/Header';

const PasswordForget = () => {
  const { register, handleSubmit } = useForm();
  const { forgotPassword, loading, error } = useForgotPassword();
  const [emailSent, setEmailSent] = useState('');
  const intl = useIntl();
  const onSubmit = async ({ email }) => {
    const { success } = await forgotPassword({ email });
    if (success) setEmailSent(intl.formatMessage({ id: 'confirmation_sent' }));
  };

  return (
    <>
      <MetaTags title={intl.formatMessage({ id: 'forgot_password' })} />
      <Header />
      <div className="container">
        {loading && <LoadingItem />}
        {emailSent && <div className="text-center"> {emailSent} </div>}
        {!loading && !emailSent && (
          <div className="row">
            <div className="col-md-8 offset-md-2 col-lg-6 offset-lg-3">
              <h1>{intl.formatMessage({ id: 'forgot_password' })}</h1>
              <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <label className="form-label">
                  {intl.formatMessage({ id: 'email' })}
                </label>
                <input
                  className="form-control"
                  name="email"
                  type="email"
                  ref={register({ required: true })}
                />
                <button
                  className="button button--primary button--big mt-3"
                  type="submit"
                >
                  {intl.formatMessage({ id: 'request_new_password' })}
                </button>
              </form>
            </div>
            <div className="error-message form-error text-center">
              {error && error.message}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default PasswordForget;
