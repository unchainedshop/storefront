import { useIntl } from 'react-intl';

const LoadingItem = () => {
  const intl = useIntl();
  return (
    <div className="container text-center dark:text-slate-100">
      <div className="m-5">
        {intl.formatMessage({ id: 'loading', defaultMessage: 'loading...' })}
      </div>
    </div>
  );
};

export default LoadingItem;
