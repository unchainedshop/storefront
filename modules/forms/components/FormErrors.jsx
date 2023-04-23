import React from 'react';
import { useFormContext } from 'react-hook-form';

const FormErrors = () => {
  const {
    formState: { errors },
  } = useFormContext();
  const submitErrors = Object.entries(errors || {}).filter(
    ([, error]) => error?.message,
  );
  if (!submitErrors.length) return null;
  return (
    <div
      style={{
        padding: '1.5em',
        fontSize: '14px',
        color: 'white',
        backgroundColor: 'darkred',
      }}
    >
      {submitErrors.map(([name, error]) => (
        <p key={name}>{error.message?.replace(/{label}/gi, name)}</p>
      ))}
    </div>
  );
};

export default FormErrors;
