import { useIntl } from 'react-intl';

const LoadingItem = () => {
  const intl = useIntl();
  return (
    <div className="container text-center">
      <div className="m-5">
        {intl.formatMessage({ id: 'loading', defaultMessage: 'Loading...' })}
      </div>
    </div>
  );
};

export default LoadingItem;
