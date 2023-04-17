import React from 'react';
import { useIntl } from 'react-intl';

import MetaTags from '../modules/common/components/MetaTags';

const ServerError = () => {
  const intl = useIntl();
  return (
    <>
      <MetaTags title="500: oops, something went wrong" />
      <div className="text-danger p-md-5 container p-3 text-center">
        <div className="p-lg-5 mb-4">
          <h1 className="font-weight-bolder font-dax-ot-regular">
            500 - Server-side error occurred
          </h1>
          <div className="mb-5">
            <div className="text-center">
              <p>
                {intl.formatMessage({
                  id: '505_sorry',
                  defaultMessage:
                    'oops, Something went wrong when performing your request, please try again later!',
                })}
              </p>
            </div>
          </div>
        </div>
        <div />
      </div>
    </>
  );
};

export default ServerError;
