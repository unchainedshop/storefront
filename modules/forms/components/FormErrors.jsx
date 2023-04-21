import React from 'react';
import { useFormContext } from '../lib/useFormWithContext';

const FormErrors = () => {
  const { formErrors } = useFormContext();

  if (!Object.keys(formErrors || {}).length) return null;
  return (
    <div
      style={{
        padding: '1.5em',
        fontSize: '14px',
        color: 'white',
        backgroundColor: 'darkred',
      }}
    >
      {Object.entries(formErrors || {}).map(([name, error]) => (
        <p key={name}>{error.message}</p>
      ))}
    </div>
  );
};

export default FormErrors;
