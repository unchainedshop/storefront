import Link from 'next/link';
import { useState } from 'react';
import { useIntl } from 'react-intl';

import UpdateProfileForm from '../../modules/auth/components/UpdateProfileForm';
import useSetUsername from '../../modules/auth/hooks/useSetUsername';
import useUser from '../../modules/auth/hooks/useUser';
import MetaTags from '../../modules/common/components/MetaTags';
import COUNTRIES from '../../modules/common/data/countries-list';
import Footer from '../../modules/layout/components/Footer';
import Header from '../../modules/layout/components/Header';
import useRemoveEmail from '../../modules/auth/hooks/useRemoveEmail';
import useAddEmail from '../../modules/auth/hooks/useAddEmail';
import useResendVerificationEmail from '../../modules/auth/hooks/useResendVerificationEmail';
import useRedirect from '../../modules/auth/hooks/useRedirect';

const Account = () => {
  const { user } = useUser();
  const [updateUsername, setUpdateUserName] = useState(false);
  const intl = useIntl();
  const [username, setUserName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [updateProfile, setUpdateProfile] = useState(false);

  const { setUsername } = useSetUsername();
  const { removeEmail } = useRemoveEmail();
  const { addEmail } = useAddEmail();
  const { resendVerificationEmail } = useResendVerificationEmail();

  useRedirect({ to: '/login', matchAnonymous: true, matchGuests: true });

  const showDebugInfo = false;
  const showUsername = user?.roles?.includes('admin');
  const onProfileUpdateComplete = (value) => {
    if (value) setUpdateProfile(false);
  };

  const updateName = async (name) => {
    await setUsername({ username: name, userId: user._id });
    setUpdateUserName(!updateUsername);
  };

  return (
    <>
      <MetaTags
        title={user?.username || intl.formatMessage({ id: 'account' })}
      />
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="my-5">{intl.formatMessage({ id: 'account' })}</h1>
            {updateProfile ? (
              <UpdateProfileForm
                user={user}
                onSuccess={onProfileUpdateComplete}
                onCancel={onProfileUpdateComplete}
              />
            ) : (
              <div className="row">
                <div className="col-md-6">
                  {showUsername && (
                    <div className="d-flex align-items-center justify-content-between flex-wrap mb-2 border-bottom pb-3 mb-3">
                      <h2 className="my-0">
                        {intl.formatMessage({ id: 'username' })}
                      </h2>
                      {!updateUsername ? (
                        <>
                          <span className="mb-1">
                            {user?.username ||
                              intl.formatMessage({ id: 'no_username_set' })}
                          </span>
                          <button
                            type="button"
                            className=" button button--small button--secondary"
                            onClick={() => setUpdateUserName(!updateUsername)}
                          >
                            {intl.formatMessage({ id: 'change_username' })}
                          </button>
                        </>
                      ) : (
                        <>
                          <input
                            className="form-control my-2"
                            type="text"
                            onChange={(e) => setUserName(e.target.value)}
                            value={username}
                          />
                          <button
                            type="button"
                            className="button button--small button--primary"
                            onClick={() => updateName(username)}
                          >
                            {intl.formatMessage({ id: 'save_username' })}
                          </button>
                          <button
                            type="button"
                            className="button button--small text-danger"
                            onClick={() => setUpdateUserName(!updateUsername)}
                          >
                            {intl.formatMessage({ id: 'cancel' })}
                          </button>
                        </>
                      )}
                    </div>
                  )}
                  <div className="d-flex align-items-center justify-content-between flex-wrap mb-2 border-bottom pb-3">
                    <h2 className="my-0 d-inline-block mr-3">
                      {intl.formatMessage({ id: 'password' })}
                    </h2>
                    <Link href="account/change-password">
                      <a className="button button--small button--secondary">
                        {intl.formatMessage({ id: 'change_password' })}
                      </a>
                    </Link>
                  </div>
                  <div>
                    <h2>{intl.formatMessage({ id: 'email' })}</h2>
                    {user?.emails?.map((e, i) => (
                      <div key={e.address} className="mb-2 border-bottom pb-1">
                        <label className="form-label mb-1">
                          {i + 1}. {intl.formatMessage({ id: 'email' })}
                        </label>
                        <span className="mb-1 d-flex justify-content-between align-items-center flex-wrap">
                          {e.address}
                          {e.verified ? (
                            <span className="pill-success m-2">
                              <span className="pill px-2 py-1">
                                {intl.formatMessage({ id: 'verified' })}
                              </span>
                            </span>
                          ) : (
                            <>
                              <span className="pill-warning m-2">
                                <span className="pill px-2 py-1">
                                  {intl.formatMessage({ id: 'not_verified' })}
                                </span>
                              </span>
                              <button
                                type="button"
                                className="button button--small button--primary my-2"
                                onClick={() =>
                                  resendVerificationEmail(e.address)
                                }
                              >
                                {intl.formatMessage({
                                  id: 'resend_verification',
                                })}
                              </button>
                            </>
                          )}
                          {user?.emails?.length > 1 && (
                            <button
                              type="button"
                              className="button button--small button--secondary my-2"
                              onClick={() => removeEmail(e.address)}
                            >
                              {intl.formatMessage({
                                id: 'remove_email',
                              })}
                            </button>
                          )}
                        </span>
                      </div>
                    ))}
                    <div className="form-row">
                      <label className="form-label">
                        {intl.formatMessage({ id: 'add_email' })}
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        onChange={(e) => setNewEmail(e.target.value)}
                        value={newEmail}
                      />
                    </div>
                    <button
                      type="button"
                      className="button button--small button--secondary mt-2 mb-5"
                      onClick={() => addEmail(newEmail)}
                    >
                      {intl.formatMessage({ id: 'add_email' })}
                    </button>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-center justify-content-between mb-4">
                    <h2 className="my-0">Address</h2>
                    {!updateProfile && (
                      <button
                        type="button"
                        className="button button--small button--secondary"
                        onClick={() => setUpdateProfile(true)}
                      >
                        {intl.formatMessage({ id: 'change_address' })}
                      </button>
                    )}
                  </div>
                  {showDebugInfo && (
                    <>
                      <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                        <span className="mb-1">
                          {intl.formatMessage({ id: 'guest' })}
                        </span>
                        <span className="mb-1">
                          {user?.isGuest ? (
                            <b>{intl.formatMessage({ id: 'yes' })}</b>
                          ) : (
                            <b>{intl.formatMessage({ id: 'no' })}</b>
                          )}
                        </span>
                      </div>
                      <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                        <span className="mb-1">
                          {intl.formatMessage({ id: 'number_of_orders' })}
                        </span>
                        <span className="mb-1">
                          {' '}
                          {user?.order?.length || 0}
                        </span>
                      </div>
                    </>
                  )}

                  <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                    <span className="mb-1">
                      {intl.formatMessage({ id: 'first_name' })}
                    </span>
                    <span className="mb-1">
                      {user?.profile?.address?.firstName}
                    </span>
                  </div>
                  <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                    <span className="mb-1">
                      {intl.formatMessage({ id: 'last_name' })}
                    </span>
                    <span className="mb-1">
                      {user?.profile?.address?.lastName}
                    </span>
                  </div>
                  <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                    <span className="mb-1">
                      {intl.formatMessage({ id: 'company' })}
                    </span>
                    <span className="mb-1">
                      {user?.profile?.address?.Company}
                    </span>
                  </div>
                  <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                    <span className="mb-1">
                      {intl.formatMessage({ id: 'address' })}
                    </span>
                    <span className="mb-1">
                      {' '}
                      {user?.profile?.address?.addressLine}{' '}
                      {user?.profile?.address?.addressLine2 && (
                        <>
                          <br />
                          {user?.profile?.address?.addressLine2}
                        </>
                      )}
                    </span>
                  </div>
                  <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                    <span className="mb-1">
                      {intl.formatMessage({ id: 'telephone' })}
                    </span>
                    <span className="mb-1"> {user?.profile?.phoneMobile} </span>
                  </div>
                  <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                    <span className="mb-1">
                      {intl.formatMessage({ id: 'postal_code' })}
                    </span>
                    <span className="mb-1">
                      {' '}
                      {user?.profile?.address?.postalCode}{' '}
                    </span>
                  </div>
                  <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                    <span className="mb-1">
                      {intl.formatMessage({ id: 'city' })}
                    </span>
                    <span className="mb-1">
                      {' '}
                      {user?.profile?.address?.city}{' '}
                    </span>
                  </div>
                  <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                    <span className="mb-1">
                      {intl.formatMessage({ id: 'region' })}
                    </span>
                    <span className="mb-1">
                      {' '}
                      {user?.profile?.address?.regionCode}{' '}
                    </span>
                  </div>
                  <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                    <span className="mb-1">
                      {intl.formatMessage({ id: 'country' })}
                    </span>
                    <span className="mb-1">
                      {
                        COUNTRIES.filter(
                          (c) => c.code === user?.profile?.address?.countryCode,
                        )[0]?.name
                      }
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Account;
