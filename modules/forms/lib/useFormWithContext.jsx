import React, { createContext, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';

const FormContext = createContext();

const useFormWithContext = () => {
  const { register, handleSubmit, errors, setError, clearErrors, formState } =
    useForm();
  const [formErrors, setFormErrors] = useState(errors);

  const handleSetError = (name, error) => {
    setError(name, error);
    setFormErrors((er) => ({
      ...er,
      [name]: error,
    }));
  };

  return {
    register,
    handleSubmit,
    formErrors,
    setError: handleSetError,
    clearErrors,
    formState,
  };
};

export const FormProvider = ({ children }) => {
  const form = useFormWithContext();
  return <FormContext.Provider value={form}>{children}</FormContext.Provider>;
};

export const useFormContext = () => {
  return useContext(FormContext);
};

export default useFormWithContext;
