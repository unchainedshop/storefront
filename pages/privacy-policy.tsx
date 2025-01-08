import { useIntl } from "react-intl";

import MetaTags from "../modules/common/components/MetaTags";

const Privacy = () => {
  const intl = useIntl();

  return (
    <>
      <MetaTags
        title={intl.formatMessage({ id: "privacy", defaultMessage: "Privacy" })}
      />
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <h1>
              {intl.formatMessage({ id: "privacy", defaultMessage: "Privacy" })}
            </h1>
            <p>...</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Privacy;
