import { useIntl } from 'react-intl';

import MetaTags from '../modules/common/components/MetaTags';

const Conditions = () => {
  const intl = useIntl();

  return (
    <>
      <MetaTags
        title={intl.formatMessage({
          id: 'conditions',
          defaultMessage: 'Conditions',
        })}
      />
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <h1>
              {intl.formatMessage({
                id: 'conditions',
                defaultMessage: 'Conditions',
              })}
            </h1>
            <p>...</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Conditions;
