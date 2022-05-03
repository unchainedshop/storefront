import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import COUNTRIES from '../../common/data/countries-list';
import useUpdateUserProfile from '../hooks/useUpdateUserProfile';

const UpdateProfileForm = ({ user, onSuccess, onCancel }) => {
  const { register, handleSubmit, errors } = useForm();
  const { formatMessage } = useIntl();
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
          <div
            className={`col-md-6 mb-3 ${errors.firstName ? 'form-error' : ''}`}
          >
            <label className="form-label">
              {formatMessage({
                id: 'first_name',
                defaultMessage: 'First Name',
              })}
            </label>
            <input
              className="form-control"
              defaultValue={profile?.address?.firstName}
              name="firstName"
              ref={register({ required: true })}
            />
          </div>
          <div
            className={`col-md-6 mb-3 ${errors.lastName ? 'form-error' : ''}`}
          >
            <label className="form-label">
              {formatMessage({ id: 'last_name', defaultMessage: 'Last Name' })}
            </label>
            <input
              className={`form-control ${errors.lastName && 'form-error'}`}
              name="lastName"
              defaultValue={profile?.address?.lastName}
              ref={register({ required: true })}
            />
          </div>
          <div
            className={`col-md-6 mb-3 ${errors.company ? 'form-error' : ''}`}
          >
            <label className="form-label">
              {formatMessage({ id: 'company', defaultMessage: 'Company' })}{' '}
              {formatMessage({ id: 'optional', defaultMessage: 'Optional' })}
            </label>
            <input
              className="form-control"
              name="company"
              defaultValue={profile?.address?.company}
              ref={register}
            />
          </div>
          <div
            className={`col-md-6 mb-3 ${
              errors.addressLine ? 'form-error' : ''
            }`}
          >
            <label className="form-label">
              {formatMessage({ id: 'address', defaultMessage: 'Address' })}
            </label>
            <input
              className={`form-control ${errors.addressLine && 'form-error'}`}
              name="addressLine"
              defaultValue={profile?.address?.addressLine}
              ref={register({ required: true })}
            />
          </div>
          <div
            className={`col-md-6 mb-3 ${errors.postalCode ? 'form-error' : ''}`}
          >
            <label className="form-label">
              {formatMessage({
                id: 'postal_code',
                defaultMessage: 'Postal Code',
              })}
            </label>
            <input
              className={`form-control ${errors.postalCode && 'form-error'}`}
              name="postalCode"
              defaultValue={profile?.address?.postalCode}
              ref={register({ required: true })}
            />
          </div>
          <div className={`col-md-6 mb-3 ${errors.city ? 'form-error' : ''}`}>
            <label className="form-label">City</label>
            <input
              className={`form-control ${errors.city && 'form-error'}`}
              name="city"
              defaultValue={profile?.address?.city}
              ref={register({ required: true })}
            />
          </div>
          <div
            className={`col-md-6 mb-3 ${errors.regionCode ? 'form-error' : ''}`}
          >
            <label className="form-label">
              {formatMessage({ id: 'region', defaultMessage: 'Region' })} {'  '}{' '}
              {formatMessage({ id: 'optional', defaultMessage: 'Optional' })}
            </label>
            <input
              className={`form-control ${errors.regionCode && 'form-error'}`}
              name="regionCode"
              defaultValue={profile?.address?.regionCode}
            />
          </div>
          <div
            className={`col-md-6 mb-3 ${
              errors.countryCode ? 'form-error' : ''
            }`}
          >
            <label className="form-label">
              {formatMessage({ id: 'country', defaultMessage: 'Country' })}
            </label>
            <select
              name="countryCode"
              defaultValue={profile?.address?.countryCode}
              ref={register({ required: true })}
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
            className={`col-md-6 mb-3 ${errors.telNumber ? 'form-error' : ''}`}
          >
            <label className="form-label">
              {formatMessage({ id: 'telephone', defaultMessage: 'Telephone' })}
            </label>
            <input
              className={`form-control ${errors.telNumber && 'form-error'}`}
              name="telNumber"
              defaultValue={profile?.phoneMobile}
              ref={register({ required: true })}
            />
          </div>
        </div>
        <div>
          <input
            type="submit"
            className="button button--primary my-1"
            value={formatMessage({
              id: 'save_address',
              defaultMessage: 'Save',
            })}
          />
          <input
            type="button"
            className="button button--secondary my-1 ml-2"
            value={formatMessage({ id: 'cancel', defaultMessage: 'Cancel' })}
            onClick={onCancel}
          />
        </div>
      </form>
    </div>
  );
};

export default UpdateProfileForm;
