import React from 'react';

const FormContext = React.createContext({
  submitError: '',
  formik: {},
  setSubmitError: () => {},
  disabled: false,
});

export default FormContext;
