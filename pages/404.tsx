import React from 'react';
import Link from 'next/link';
import { useIntl } from 'react-intl';

import Footer from '../modules/layout/components/Footer';
import MetaTags from '../modules/common/components/MetaTags';

const NotFound = ({ page = '' }) => {
  const intl = useIntl();
  return (
    <>
      <MetaTags title="404: Not Found" />

      <div className="text-danger p-md-5 container p-3 text-center">
        <div className="p-lg-5 mb-4">
          <h1 className="font-weight-bolder font-dax-ot-regular">
            404: Requested {page || 'Page'} not found
          </h1>
          <div className="mb-5">
            <div className="text-center">
              <p>
                {intl.formatMessage({
                  id: '404_sorry',
                  defaultMessage:
                    'Sorry, the page you were looking for was not found!',
                })}{' '}
              </p>
              <Link href="/">
                <a className="button button--primary">
                  {intl.formatMessage({
                    id: 'back_to_home',
                    defaultMessage: 'Back to home',
                  })}
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div />
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
