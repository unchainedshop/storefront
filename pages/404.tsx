import React from 'react';
import Link from 'next/link';
import { useIntl } from 'react-intl';

import Header from '../modules/layout/components/Header';
import Footer from '../modules/layout/components/Footer';
import MetaTags from '../modules/common/components/MetaTags';

const NotFound = ({ page = '' }) => {
  const intl = useIntl();
  return (
    <>
      <MetaTags title="404: Not Found" />
      <Header />
      <div className="text-danger container p-4 text-center md:p-5">
        <div className="mb-6 lg:p-12">
          <h1 className="font-dax-ot-regular font-[bolder]">
            404: Requested {page || 'Page'} not found
          </h1>
          <div className="mb-5">
            <div className="text-center">
              <p>{intl.formatMessage({ id: '404_sorry' })} </p>
              <Link href="/">
                <a className="button button--primary">
                  {intl.formatMessage({ id: 'back_to_home' })}
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
