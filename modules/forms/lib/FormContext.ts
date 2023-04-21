import React from 'react';

const FormContext = React.createContext({
  register: () => {},
  handleSubmit: () => {},
  formErrors: {},
  setError: () => {},
  clearErrors: () => {},
  formState: {},
});

export default FormContext;
