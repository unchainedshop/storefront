import React from "react";
import useValidators from "../lib/useValidators";

import TextField from "./TextField";

const EmailField = ({ ...props }) => {
  const { validateEmail } = useValidators();
  return (
    <TextField
      {...props}
      type="email"
      validators={{ invalidEmail: validateEmail }}
    />
  );
};

export default EmailField;
