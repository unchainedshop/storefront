import { BanIcon } from '@heroicons/react/solid';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl';

const NoData = ({ message, className = '', Icon }) => {
  return (
    <div
      className={classnames(
        'flex w-full flex-col items-center justify-center bg-white py-8 text-slate-500 dark:bg-slate-500 dark:text-white',
        className,
      )}
    >
      <div className="grid items-center justify-center">
        <div className="flex items-center justify-center text-indigo-300 dark:text-white">
          {Icon || <BanIcon className="h-8 w-8" />}
        </div>

        <FormattedMessage
          id="no_data_message"
          defaultMessage="<p>No <span>  {message}  available</span> </p>"
          values={{
            p: (chunks) => (
              <p className="m-auto mt-2 flex items-center justify-center">
                {chunks}
              </p>
            ),
            span: (chunks) => <span className="capitalize"> {chunks}</span>,
            message,
          }}
        />
      </div>
    </div>
  );
};

export default NoData;
