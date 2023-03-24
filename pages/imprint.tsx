import { useIntl } from 'react-intl';

import MetaTags from '../modules/common/components/MetaTags';

const Imprint = () => {
  const intl = useIntl();

  return (
    <>
      <MetaTags
        title={intl.formatMessage({ id: 'imprint', defaultMessage: 'Imprint' })}
      />
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <h1>
              {intl.formatMessage({ id: 'imprint', defaultMessage: 'Imprint' })}
            </h1>
            <p>...</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Imprint;
