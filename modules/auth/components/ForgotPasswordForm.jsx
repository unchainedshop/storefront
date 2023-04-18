import classNames from 'classnames';
import { useState } from 'react';
import { useIntl } from 'react-intl';

const ForgotPasswordForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const { formatMessage } = useIntl();

  const [message, setMessage] = useState(null);
  return (
    <div className="bg-white dark:bg-slate-500 py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <form
        className="space-y-6"
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          try {
            await onSubmit({ email });
            setMessage({
              success: true,
              text: 'Der Link zum Zurücksetzen des Passworts wurde an die obige E-Mail gesendet. Bitte verwenden Sie den in der E-Mail gesendeten Link, um Ihr Passwort zurückzusetzen',
            });
          } catch (err) {
            if (err.message.toLowerCase().includes('user not found')) {
              setMessage({
                success: false,
                text: 'Konto mit der E-Mail-Adresse existiert nicht, bitte überprüfen Sie die E-Mail-Adresse und versuchen Sie es erneut',
              });
            } else {
              setMessage({ success: false, text: err.message });
            }
          }
        }}
      >
        <div>
          <label
            htmlFor="email-address"
            className="block text-sm font-medium text-brown-600 dark:text-white"
          >
            {formatMessage({
              id: 'email-address',
              defaultMessage: 'Email Address',
            })}
          </label>
          <div className="mt-1">
            <input
              type="email"
              name="email"
              id="email-address"
              className="bg-beige block w-full appearance-none rounded-md border border-slate-300 px-3 py-2 placeholder-slate-400 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-800 sm:text-sm"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          className="flex w-full justify-center rounded-md border border-transparent bg-slate-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2"
        >
          {formatMessage({
            id: 'send-reset-link',
            defaultMessage: 'Send reset link',
          })}
        </button>
        {message?.text && (
          <div
            className={classNames('text-red-500', {
              'text-green-500': message?.text && message.success === true,
            })}
          >
            {message.text}
          </div>
        )}
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
