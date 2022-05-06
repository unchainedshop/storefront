import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import useUpdateUserProfile from '../../auth/hooks/useUpdateUserProfile';
import COUNTRIES from '../data/countries-list';
import Button from './Button';

const Address = ({ user }) => {
  const { formatMessage } = useIntl();
  const { updateUserProfile } = useUpdateUserProfile();
  const { register, handleSubmit, errors } = useForm();

  const [updateProfile, setUpdateProfile] = useState(false);

  const onProfileUpdateComplete = (value) => {
    if (value) setUpdateProfile(false);
  };

  const { profile = {} } = user;

  const onSubmit = async (form) => {
    const {
      addressLine,
      addressLine2,
      postalCode,
      city,
      telNumber,
      regionCode,
      countryCode,
    } = form;

    const userProfile = {
      phoneMobile: telNumber,
      address: {
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
      id="address"
      aria-labelledby="address"
      className="pt-6 sm:px-6 lg:col-span-9 lg:col-start-4 lg:px-0"
    >
      <div className="space-y-6 ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="shadow sm:overflow-hidden sm:rounded-md">
            <div className="bg-white py-6 px-4 dark:bg-slate-500 dark:text-slate-200 sm:p-6">
              <div>
                <h1
                  id="address-heading"
                  className="text-lg font-medium leading-6 text-slate-900 dark:text-slate-100"
                >
                  {formatMessage({
                    id: 'address',
                    defaultMessage: 'Address',
                  })}
                </h1>
              </div>

              <div className="mt-6 grid grid-cols-4 gap-6">
                <div className="col-span-4 sm:col-span-2">
                  <div className="mb-1">
                    {formatMessage({
                      id: 'address',
                      defaultMessage: 'Address',
                    })}
                  </div>
                  {updateProfile ? (
                    <input
                      className={`block w-full rounded-md border border-solid border-slate-900 bg-slate-100 py-2 px-2 text-sm placeholder-slate-500 transition focus:border-slate-900 focus:text-slate-900 focus:placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 dark:text-slate-600 ${
                        errors.addressLine && 'form-error'
                      }`}
                      name="addressLine"
                      defaultValue={profile?.address?.addressLine}
                      ref={register({ required: true })}
                    />
                  ) : (
                    <div className="mb-1">
                      {user?.profile?.address?.addressLine}
                    </div>
                  )}
                </div>

                <div className="col-span-4 sm:col-span-2">
                  <div className="mb-1">
                    {formatMessage({
                      id: 'address_2',
                      defaultMessage: 'Address 2',
                    })}
                  </div>
                  {updateProfile ? (
                    <input
                      className={`block w-full rounded-md border border-solid border-slate-900 bg-slate-100 py-2 px-2 text-sm placeholder-slate-500 transition focus:border-slate-900 focus:text-slate-900 focus:placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 dark:text-slate-600 ${
                        errors.addressLine && 'form-error'
                      }`}
                      name="addressLine2"
                      defaultValue={user?.profile?.address?.addressLine2}
                      ref={register({ required: false })}
                    />
                  ) : (
                    <div className="mb-1">
                      {user?.profile?.address?.addressLine2}
                    </div>
                  )}
                </div>

                <div className="col-span-4 sm:col-span-2">
                  <div className="mb-1">
                    {formatMessage({
                      id: 'telephone',
                      defaultMessage: 'Telephone',
                    })}
                  </div>
                  {updateProfile ? (
                    <input
                      className={`block w-full rounded-md border border-solid border-slate-900 bg-slate-100 py-2 px-2 text-sm placeholder-slate-500 transition focus:border-slate-900 focus:text-slate-900 focus:placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 dark:text-slate-600 ${
                        errors.telNumber && 'form-error'
                      }`}
                      name="telNumber"
                      defaultValue={profile?.phoneMobile}
                      ref={register({ required: true })}
                    />
                  ) : (
                    <div className="mb-1">{user?.profile?.phoneMobile}</div>
                  )}
                </div>

                <div className="col-span-4 sm:col-span-2">
                  <div className="mb-1">
                    {formatMessage({
                      id: 'postal_code',
                      defaultMessage: 'Postal Code',
                    })}
                  </div>
                  {updateProfile ? (
                    <input
                      className={`block w-full rounded-md border border-solid border-slate-900 bg-slate-100 py-2 px-2 text-sm placeholder-slate-500 transition focus:border-slate-900 focus:text-slate-900 focus:placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 dark:text-slate-600 ${
                        errors.postalCode && 'form-error'
                      }`}
                      name="postalCode"
                      defaultValue={profile?.address?.postalCode}
                      ref={register({ required: true })}
                    />
                  ) : (
                    <div className="mb-1">
                      {user?.profile?.address?.postalCode}
                    </div>
                  )}
                </div>

                <div className="col-span-4 sm:col-span-2">
                  <div className="mb-1">
                    {formatMessage({
                      id: 'country',
                      defaultMessage: 'Country',
                    })}
                  </div>
                  {updateProfile ? (
                    <select
                      name="countryCode"
                      defaultValue={profile?.address?.countryCode}
                      ref={register({ required: true })}
                      className={`block w-full rounded-md border border-solid border-slate-900 bg-slate-100 py-2 px-2 text-sm placeholder-slate-500 transition focus:border-slate-900 focus:text-slate-900 focus:placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 dark:text-slate-600 ${
                        errors.countryCode && 'form-error'
                      }`}
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c.code} value={c.code}>
                          {' '}
                          {c.name}{' '}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="mb-1">
                      {
                        COUNTRIES.filter(
                          (c) => c.code === user?.profile?.address?.countryCode,
                        )[0]?.name
                      }
                    </div>
                  )}
                </div>

                <div className="col-span-4 sm:col-span-2">
                  <div className="mb-1">
                    {formatMessage({
                      id: 'region',
                      defaultMessage: 'Region',
                    })}
                  </div>
                  {updateProfile ? (
                    <input
                      className={`block w-full rounded-md border border-solid border-slate-900 bg-slate-100 py-2 px-2 text-sm placeholder-slate-500 transition focus:border-slate-900 focus:text-slate-900 focus:placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 dark:text-slate-600 ${
                        errors.regionCode && 'form-error'
                      }`}
                      name="regionCode"
                      defaultValue={profile?.address?.regionCode}
                    />
                  ) : (
                    <div className="mb-1">
                      {user?.profile?.address?.regionCode}
                    </div>
                  )}
                </div>

                <div className="col-span-4 sm:col-span-2">
                  <div className="mb-1">
                    {formatMessage({
                      id: 'city',
                      defaultMessage: 'City',
                    })}
                  </div>
                  {updateProfile ? (
                    <input
                      className={`block w-full rounded-md border border-solid border-slate-900 bg-slate-100 py-2 px-2 text-sm placeholder-slate-500 transition focus:border-slate-900 focus:text-slate-900 focus:placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 dark:text-slate-600 ${
                        errors.city && 'form-error'
                      }`}
                      name="city"
                      defaultValue={profile?.address?.city}
                      ref={register({ required: true })}
                    />
                  ) : (
                    <div className="mb-1">{user?.profile?.address?.city}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="bg-slate-50 px-4 py-3 text-right dark:bg-slate-400 sm:px-6">
              {updateProfile ? (
                <Button
                  text={formatMessage({
                    id: 'cancel',
                    defaultMessage: 'Cancel',
                  })}
                  onClick={onProfileUpdateComplete}
                  className="mx-4 inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                />
              ) : null}
              <Button
                text={formatMessage({
                  id: 'update_address',
                  defaultMessage: `${updateProfile ? 'save' : 'update'}`,
                })}
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-slate-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
                onClick={() => setUpdateProfile(true)}
              />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Address;
