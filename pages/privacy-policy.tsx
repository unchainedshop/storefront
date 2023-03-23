import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import MetaTags from '../modules/common/components/MetaTags';
import Footer from '../modules/layout/components/Footer';

const Privacy = () => {
  const [currentUrl, setcurrentUrl] = useState('');
  const intl = useIntl();
  useEffect(() => {
    setcurrentUrl(window.location.href);
  }, []);

  return (
    <>
      <MetaTags
        title={intl.formatMessage({ id: 'privacy', defaultMessage: 'Privacy' })}
        url={currentUrl}
      />
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <h1>
              {intl.formatMessage({ id: 'privacy', defaultMessage: 'Privacy' })}
            </h1>
            <p>...</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Privacy;
