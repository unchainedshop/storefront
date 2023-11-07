import { useIntl } from 'react-intl';
import { useAppContext } from '../common/components/AppContextWrapper';
import Button from '../common/components/Button';
import EmailField from '../forms/components/EmailField';
import Form from '../forms/components/Form';
import FormErrors from '../forms/components/FormErrors';
import SubmitButton from '../forms/components/SubmitButton';
import TextField from '../forms/components/TextField';
import Toggle from '../common/components/Toggle';
import usePushNotification from '../context/push-notification/usePushNotification';

const ContactForm = ({ contact, onSubmit, onCancel }) => {
  const { formatMessage } = useIntl();
  const { isSubscribed, subscribe, unsubscribe } = usePushNotification();
  const { emailSupportDisabled } = useAppContext();
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
          required={!emailSupportDisabled}
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
      <Toggle
        className=""
        onToggle={async () => {
          if (isSubscribed) {
            await unsubscribe();
          } else {
            await subscribe();
          }
        }}
        toggleText="Receive order confirmation / order status update"
        toggleKey=""
        active={isSubscribed}
      />
    </Form>
  );
};

export default ContactForm;
