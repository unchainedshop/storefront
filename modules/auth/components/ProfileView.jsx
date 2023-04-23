import { useState } from 'react';
import { useIntl } from 'react-intl';

import useUpdateUserProfile from '../hooks/useUpdateUserProfile';
import Button from '../../common/components/Button';

import TextField from '../../forms/components/TextField';
import Form from '../../forms/components/Form';
import SubmitButton from '../../forms/components/SubmitButton';

const ProfileView = ({ user }) => {
  const { formatMessage } = useIntl();

  const { updateUserProfile } = useUpdateUserProfile();

  const [updateProfile, setUpdateProfile] = useState(false);

  if (!user) return null;
  const { profile = {} } = user;

  const onProfileUpdateComplete = (value) => {
    if (value) setUpdateProfile(false);
  };

  const onSubmit = async (form) => {
    const { firstName, lastName, company } = form;
    const {
      addressLine,
      addressLine2,
      postalCode,
      city,
      regionCode,
      countryCode,
    } = profile?.address || {};

    const userProfile = {
      address: {
        firstName,
        lastName,
        company,
        addressLine,
        addressLine2,
        postalCode,
        city,
        regionCode,
        countryCode,
      },
    };

    await updateUserProfile({ profile: userProfile, userId: user._id });
    onProfileUpdateComplete(true);
  };

  return (
    <section
      id="profileview"
      className="space-y-6 sm:px-6 lg:col-span-9 lg:col-start-4 lg:px-0"
      aria-labelledby="payment-details-heading"
    >
      <Form onSubmit={onSubmit}>
        <div className="shadow sm:overflow-hidden sm:rounded-md">
          <div className="bg-white py-6 px-4 dark:bg-slate-500 dark:text-slate-200 sm:p-6">
            <div className="divide-y divide-slate-200">
              <div className="space-y-1">
                <h3 className="text-lg font-medium leading-6 text-slate-900 dark:text-slate-100">
                  {formatMessage({
                    id: 'account',
                    defaultMessage: 'Account',
                  })}
                </h3>
              </div>
              <div className="mt-6">
                <div className="divide-y divide-slate-200">
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                    <div className="text-sm font-medium text-slate-500 dark:text-slate-200">
                      {formatMessage({
                        id: 'full_name',
                        defaultMessage: 'Full name',
                      })}
                    </div>
                    <div className="mb-2 flex items-center gap-x-16 sm:col-span-2">
                      <div className="mt-1 flex text-sm text-slate-900 dark:text-slate-100 sm:mt-0">
                        {updateProfile ? (
                          <TextField
                            name="firstName"
                            defaultValue={profile?.address?.firstName}
                          />
                        ) : (
                          <span className="mb-1">
                            {user?.profile?.address?.firstName}
                          </span>
                        )}
                      </div>

                      <div className="mt-1 flex text-sm text-slate-900 dark:text-slate-100 sm:mt-0">
                        {updateProfile ? (
                          <TextField
                            name="lastName"
                            defaultValue={profile?.address?.lastName}
                          />
                        ) : (
                          <span className="mb-1">
                            {user?.profile?.address?.lastName}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-slate-200 sm:py-5">
                    <div className="mb-1 text-sm font-medium text-slate-500 dark:text-slate-200">
                      {formatMessage({
                        id: 'company',
                        defaultMessage: 'Company',
                      })}
                    </div>
                    {updateProfile ? (
                      <TextField
                        name="company"
                        defaultValue={profile?.address?.company}
                      />
                    ) : (
                      <div className="mb-1">
                        {user?.profile?.address?.company}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-slate-50 px-4 py-3 text-right dark:bg-slate-400 sm:px-6">
            {updateProfile ? (
              <div className="flex">
                <Button
                  type="button"
                  text={formatMessage({
                    id: 'cancel',
                    defaultMessage: 'Cancel',
                  })}
                  onClick={onProfileUpdateComplete}
                  className=" bg-white sm:text-black text-black hover:bg-slate-200"
                />
                <SubmitButton>
                  {formatMessage({
                    id: 'save',
                    defaultMessage: 'Save',
                  })}
                </SubmitButton>
              </div>
            ) : (
              <Button
                type="button"
                text={formatMessage({
                  id: 'update',
                  defaultMessage: 'update',
                })}
                onClick={() => setUpdateProfile(true)}
              />
            )}
          </div>
        </div>
      </Form>
    </section>
  );
};

export default ProfileView;
