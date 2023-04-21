import React from 'react';
import TextField from './TextField';

const EmailField = ({ ...props }, ref) => {
  return <TextField {...props} ref={ref} type="email" />;
};

export default EmailField;
