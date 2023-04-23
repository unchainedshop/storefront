import { FormProvider, useForm } from 'react-hook-form';

const Form = ({
  children,
  onSubmit,
  onSubmitError,
  defaultValues,
  onBeforeSubmitValidator,
}) => {
  const context = useForm({
    mode: 'onTouched',
    defaultValues,
  });

  const handler = async (data) => {
    try {
      const error =
        onBeforeSubmitValidator && (await onBeforeSubmitValidator(data));
      if (error) {
        const [key] = Object.keys(error);
        context.setError(key, error[key]);
        return;
      }

      await onSubmit(data);
    } catch (e) {
      const error = (await onSubmitError(e)) || {
        submit: {
          type: 'manual',
          message: e.message,
        },
      };
      const [key] = Object.keys(error);
      context.setError(key, error[key]);
    }
  };
  return (
    <FormProvider {...context}>
      <form onSubmit={context.handleSubmit(handler)} className="form">
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
