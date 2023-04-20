import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import COUNTRIES from '../../common/data/countries-list';
import TextField from '../../forms/components/TextField';
import useUpdateUserProfile from '../hooks/useUpdateUserProfile';

const UpdateProfileForm = ({ user, onSuccess, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const intl = useIntl();
  const { profile = {} } = user;
  const { updateUserProfile } = useUpdateUserProfile();
  const onSubmit = async (form) => {
    const {
      firstName,
      lastName,
      addressLine,
      addressLine2,
      postalCode,
      city,
      company,
      telNumber,
      regionCode,
      countryCode,
    } = form;

    const userProfile = {
      phoneMobile: telNumber,
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
    onSuccess(true);
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-row">
          <div className="mb-3 col-md-6">
            <TextField
              label={intl.formatMessage({
                id: 'first_name',
                defaultMessage: 'Firstname',
              })}
              className="form-control"
              defaultValue={profile?.address?.firstName}
              name="firstName"
              error={errors.firstName}
              {...register('firstName', { required: true })}
            />
          </div>
          <div className="mb-3 col-md-6 ">
            <TextField
              className={`form-control ${errors.lastName && 'form-error'}`}
              name="lastName"
              label={intl.formatMessage({
                id: 'last-name',
                defaultMessage: 'Lastname',
              })}
              error={errors.lastName}
              defaultValue={profile?.address?.lastName}
              {...register('lastName', { required: true })}
            />
          </div>
          <div className={`mb-3 col-md-6 `}>
            <TextField
              label={`${intl.formatMessage({
                id: 'company-name',
                defaultMessage: 'Company Name',
              })} 
            ${intl.formatMessage({
              id: 'optional',
              defaultMessage: '(Optional)',
            })}`}
              className="form-control"
              name="company"
              defaultValue={profile?.address?.company}
              {...register('company')}
            />
          </div>
          <div className="mb-3 col-md-6">
            <TextField
              label={intl.formatMessage({
                id: 'address',
                defaultMessage: 'Address',
              })}
              className={`form-control ${errors.addressLine && 'form-error'}`}
              name="addressLine"
              defaultValue={profile?.address?.addressLine}
              {...register('addressLine', { required: true })}
            />
          </div>
          <div
            className={`mb-3 col-md-6 ${errors.postalCode ? 'form-error' : ''}`}
          >
            <label className="form-label">
              {intl.formatMessage({
                id: 'postal-code-or-zip',
                defaultMessage: 'Postal Code / ZIP',
              })}
            </label>
            <input
              className={`form-control ${errors.postalCode && 'form-error'}`}
              name="postalCode"
              defaultValue={profile?.address?.postalCode}
              {...register('postalCode', { required: true })}
            />
          </div>
          <div className={`mb-3 col-md-6 ${errors.city ? 'form-error' : ''}`}>
            <label className="form-label">City</label>
            <input
              className={`form-control ${errors.city && 'form-error'}`}
              name="city"
              defaultValue={profile?.address?.city}
              {...register('city', { required: true })}
            />
          </div>
          <div
            className={`mb-3 col-md-6 ${errors.regionCode ? 'form-error' : ''}`}
          >
            <label className="form-label">
              {intl.formatMessage({ id: 'region', defaultMessage: 'Region' })}{' '}
              {'  '}{' '}
              {intl.formatMessage({
                id: 'optional',
                defaultMessage: '(Optional)',
              })}
            </label>
            <input
              className={`form-control ${errors.regionCode && 'form-error'}`}
              name="regionCode"
              defaultValue={profile?.address?.regionCode}
            />
          </div>
          <div
            className={`mb-3 col-md-6 ${
              errors.countryCode ? 'form-error' : ''
            }`}
          >
            <label className="form-label">
              {intl.formatMessage({ id: 'country', defaultMessage: 'Country' })}
            </label>
            <select
              name="countryCode"
              defaultValue={profile?.address?.countryCode}
              {...register('countryCode', { required: true })}
              className={`form-control ${errors.countryCode && 'form-error'}`}
            >
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {' '}
                  {c.name}{' '}
                </option>
              ))}
            </select>
          </div>
          <div
            className={`mb-3 col-md-6 ${errors.telNumber ? 'form-error' : ''}`}
          >
            <label className="form-label">
              {intl.formatMessage({
                id: 'telephone-number',
                defaultMessage: 'Telephone Number',
              })}
            </label>
            <input
              className={`form-control ${errors.telNumber && 'form-error'}`}
              name="telNumber"
              defaultValue={profile?.phoneMobile}
              {...register('telNumber', { required: true })}
            />
          </div>
        </div>
        <div>
          <input
            type="submit"
            className="button button--primary my-1"
            value={intl.formatMessage({
              id: 'save_address',
              defaultMessage: 'Save Address',
            })}
          />
          <input
            type="button"
            className="button button--secondary ml-2 my-1"
            value={intl.formatMessage({
              id: 'cancel',
              defaultMessage: 'Cancel',
            })}
            onClick={onCancel}
          />
        </div>
      </form>
    </div>
  );
};

export default UpdateProfileForm;
