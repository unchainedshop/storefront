import { FormProvider, useForm } from 'react-hook-form';

const Form = ({ children, onSubmit, onSubmitError }) => {
  const context = useForm();

  const handler = async (data) => {
    try {
      await onSubmit(data);
    } catch (e) {
      alert('sssssssssss');
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
