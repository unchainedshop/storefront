import React from 'react';

const FormContext = React.createContext({
  submitError: '',
  form: {},
  setSubmitError: () => {},
  disabled: false,
  register: () => {},
  setError: () => {},
  clearError: () => {},
  validateField: () => {},
  validateAllFields: () => {},
  errors: {},
});

export default FormContext;
