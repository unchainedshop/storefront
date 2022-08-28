import Link from 'next/link';
import { useIntl } from 'react-intl';

const ConnectPopup = ({ isOpen, connect }) => {
  const { formatMessage } = useIntl();
  return (
    isOpen && (
      <div className="align-items-center fixed top-0 left-0 right-0 bottom-0 z-[100000] flex justify-center bg-color-light-dark opacity-95">
        <div className="absolute mx-auto mt-40 w-1/4 max-w-lg bg-white p-5">
          <h1>
            {formatMessage({
              id: 'accept_terms_popup_header',
              defaultMessage: 'Accept Terms and Conditions',
            })}
          </h1>
          <p>
            {formatMessage({
              id: 'accept_terms_popup_subtitle',
              defaultMessage:
                'By connecting my wallet to this webapp, I confirm that I have read           and understood the',
            })}
            <Link href="/terms">
              <a>
                {formatMessage({
                  id: 'terms_and_conditions',
                  defaultMessage: 'Terms and Conditions',
                })}
              </a>
            </Link>
            {formatMessage({
              id: 'terms_and_condition_main',
              defaultMessage:
                'In particular, I confirm that I know what I am doing and that I am not violating any governing jurisdictions law. The company Unchained            Commerce GmbH or any of its employees can not be held liable for any            loss of funds, hacks or other damages that might have happend by using this webapp.',
            })}
            .
            <button
              type="button"
              className="w-100 mt-3 bg-slate-700 p-3 text-white hover:bg-slate-600 "
              onClick={connect}
            >
              {formatMessage({
                id: 'confirm_and_connect',
                defaultMessage: 'Confirm and Connect',
              })}
            </button>
          </p>
        </div>
      </div>
    )
  );
};

export default ConnectPopup;
