import React from 'react';

const FormErrors = ({ errors }) => {
  if (!Object.keys(errors || {}).length) return null;
  return (
    <div
      style={{
        padding: '1.5em',
        fontSize: '14px',
        color: 'white',
        backgroundColor: 'darkred',
      }}
    >
      {Object.entries(errors || {}).map(([name, error]) => (
        <p key={name}>{error.message}</p>
      ))}
    </div>
  );
};

export default FormErrors;
