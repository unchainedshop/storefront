import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import useAddEmail from '../hooks/useAddEmail';
import useRemoveEmail from '../hooks/useRemoveEmail';
import useResendVerificationEmail from '../hooks/useResendVerificationEmail';
import useUpdateUserProfile from '../hooks/useUpdateUserProfile';
import Button from '../../common/components/Button';
import VerifiedStatus from '../../common/components/VerifiedStatus';
import TextField from '../../forms/components/TextField';

const ProfileView = ({ user }) => {
  const { formatMessage } = useIntl();
  const { register, handleSubmit } = useForm();

  const { updateUserProfile } = useUpdateUserProfile();
  const { removeEmail } = useRemoveEmail();
  const { addEmail } = useAddEmail();
  const { resendVerificationEmail } = useResendVerificationEmail();

  const [updateProfile, setUpdateProfile] = useState(false);
  const [newEmail, setNewEmail] = useState('');

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
      <form onSubmit={handleSubmit(onSubmit)}>
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
                        defaultMessage: 'Full Name',
                      })}
                    </div>
                    <div className="mb-2 flex items-center gap-x-16 sm:col-span-2">
                      <div className="mt-1 flex text-sm text-slate-900 dark:text-slate-100 sm:mt-0">
                        {updateProfile ? (
                          <TextField
                            name="firstName"
                            defaultValue={profile?.address?.firstName}
                            {...register('firstName')}
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
                            {...register('lastName')}
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
                        {...register('company')}
                      />
                    ) : (
                      <div className="mb-1">
                        {user?.profile?.address?.company}
                      </div>
                    )}
                  </div>
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                    <h2 className="text-sm font-medium text-slate-500 dark:text-slate-200">
                      {formatMessage({
                        id: 'email-addresses',
                        defaultMessage: 'Email Addresses',
                      })}
                    </h2>
                    <div className="sm:col-span-2">
                      <div className="gap-2 md:grid md:grid-cols-2">
                        {user?.emails?.map((e) => (
                          <div
                            key={e.address}
                            className="mb-1 flex flex-wrap items-center"
                          >
                            <span className="text-lg font-extrabold dark:text-slate-100">
                              {e.address}
                            </span>
                            <VerifiedStatus isActive={e.verified} />
                            <div>
                              {!e.verified && updateProfile && (
                                <Button
                                  type="button"
                                  text={formatMessage({
                                    id: 'send_verification_email',
                                    defaultMessage: 'Send Verification Link',
                                  })}
                                  className="my-2 mr-2 border-0 bg-slate-900 text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                                  onClick={() =>
                                    resendVerificationEmail(e.address)
                                  }
                                />
                              )}
                              {user?.emails?.length > 1 && (
                                <Button
                                  type="button"
                                  text={formatMessage({
                                    id: 'remove',
                                    defaultMessage: 'Remove',
                                  })}
                                  className="my-2 border-0 bg-slate-100 text-slate-900 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
                                  onClick={() => removeEmail(e.address)}
                                />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {updateProfile && (
                        <div>
                          <div className="form-row">
                            <label className="form-label">
                              {formatMessage({
                                id: 'add_email',
                                defaultMessage: 'Add Email',
                              })}
                            </label>
                            <input
                              className="block w-full rounded-md border border-solid border-slate-900 bg-slate-100 py-2 px-2 text-sm placeholder-slate-500 transition focus:border-slate-900 focus:text-slate-900 focus:placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 dark:text-slate-600"
                              type="text"
                              onChange={(e) => setNewEmail(e.target.value)}
                              value={newEmail}
                            />
                          </div>
                          <Button
                            type="button"
                            text={formatMessage({
                              id: 'add_email',
                              defaultMessage: 'Add Email',
                            })}
                            onClick={() => addEmail(newEmail)}
                          />
                        </div>
                      )}
                    </div>
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
                <Button
                  text={formatMessage({
                    id: 'save',
                    defaultMessage: 'save',
                  })}
                  type="submit"
                />
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
      </form>
    </section>
  );
};

export default ProfileView;
