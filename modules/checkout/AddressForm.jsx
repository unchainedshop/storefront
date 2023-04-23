import { useIntl } from 'react-intl';
import Button from '../common/components/Button';

import COUNTRIES from '../common/data/countries-list';
import Form from '../forms/components/Form';
import FormErrors from '../forms/components/FormErrors';
import SelectField from '../forms/components/SelectField';
import TextField from '../forms/components/TextField';

const AddressForm = ({ address, onSubmit, onCancel }) => {
  const { formatMessage } = useIntl();

  const submitHandler = async (data) => {
    await onSubmit(data);
  };

  const onSubmitError = async (e) => {
    return {
      root: {
        message: e.message,
      },
    };
  };

  return (
    <Form
      onSubmit={submitHandler}
      onSubmitError={onSubmitError}
      defaultValue={{ ...address }}
    >
      <div className="mb-3">
        <TextField
          label={formatMessage({
            id: 'first_name',
            defaultMessage: 'First name',
          })}
          name="firstName"
          required
        />
      </div>
      <div className="mb-3">
        <TextField
          label={formatMessage({
            id: 'last-name',
            defaultMessage: 'Last Name',
          })}
          name="lastName"
          required
        />
      </div>
      <div className="mb-3">
        <TextField
          label={`${formatMessage({
            id: 'company-name',
            defaultMessage: 'Company Name',
          })}   ${formatMessage({
            id: 'optional',
            defaultMessage: '(Optional)',
          })}`}
          name="company"
        />
      </div>
      <div className="mb-3">
        <TextField
          label={formatMessage({ id: 'address', defaultMessage: 'Address' })}
          name="addressLine"
          required
        />
        <TextField name="addressLine2" />
      </div>
      <div className="mb-3">
        <TextField
          label={formatMessage({
            id: 'postal-code-or-zip',
            defaultMessage: 'Postal Code / ZIP',
          })}
          name="postalCode"
          required
        />
      </div>
      <div className="mb-3">
        <TextField
          label={formatMessage({
            id: 'city',
            defaultMessage: 'City',
          })}
          name="city"
          required
        />
      </div>
      <div className="mb-3">
        <TextField
          label={`${formatMessage({ id: 'region', defaultMessage: 'Region' })} 
          ${formatMessage({
            id: 'optional',
            defaultMessage: '(Optional)',
          })}`}
          name="regionCode"
        />
      </div>
      <div className="mb-3">
        <SelectField
          label={formatMessage({ id: 'country', defaultMessage: 'Country' })}
          name="countryCode"
          required
        >
          {COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>
              {' '}
              {c.name}{' '}
            </option>
          ))}
        </SelectField>
      </div>
      <FormErrors />

      <div className="pt-3">
        <Button
          text={formatMessage({
            id: 'save_address',
            defaultMessage: 'Save Address',
          })}
          type="submit"
        />
        <Button
          text={formatMessage({
            id: 'cancel',
            defaultMessage: 'Cancel',
          })}
          className=" bg-white sm:text-black text-black hover:bg-slate-200"
          type="button"
          onClick={onCancel}
        />
      </div>
    </Form>
  );
};

export default AddressForm;
