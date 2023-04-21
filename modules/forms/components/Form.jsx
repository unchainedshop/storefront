import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';

const Form = ({ children, onSubmit, ...formProps }) => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} {...formProps}>
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
