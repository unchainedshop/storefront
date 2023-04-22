import { useIntl } from 'react-intl';
import Button from '../common/components/Button';
import EmailField from '../forms/components/EmailField';
import Form from '../forms/components/Form';
import FormErrors from '../forms/components/FormErrors';
import SubmitButton from '../forms/components/SubmitButton';
import TextField from '../forms/components/TextField';

const ContactForm = ({ contact, onSubmit, onCancel }) => {
  const { formatMessage } = useIntl();

  const submitHandler = async (data) => {
    await onSubmit(data);
  };

  const onSubmitError = (e) => {
    return {
      root: {
        message: e.message as string,
      },
    };
  };

  return (
    <Form
      onSubmit={submitHandler}
      onSubmitError={onSubmitError}
      defaultValues={contact}
    >
      <div className="mb-3">
        <EmailField
          label={formatMessage({
            id: 'email-address',
            defaultMessage: 'Email Address',
          })}
          required
          name="emailAddress"
        />
      </div>
      <div className="mb-3">
        <TextField
          label={formatMessage({
            id: 'telNumber',
            defaultMessage: 'Mobile Phone',
          })}
          type="tel"
          name="telNumber"
          required
        />
      </div>
      <FormErrors />
      <div className="pt-3">
        <SubmitButton>
          {formatMessage({
            id: 'save_contact',
            defaultMessage: 'Save Contact Data',
          })}
        </SubmitButton>
        <Button
          text={formatMessage({
            id: 'cancel',
            defaultMessage: 'Cancel',
          })}
          type="button"
          className="inline-flex justify-center mt-2 mr-1 rounded-md border border-transparent bg-white py-2 px-4 text-sm font-medium  slate-800 shadow-sm hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:ring-offset-2"
          onClick={onCancel}
        />
      </div>
    </Form>
  );
};

export default ContactForm;
