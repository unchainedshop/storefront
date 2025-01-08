import React from "react";
import { useFormContext } from "react-hook-form";

const FormErrors = () => {
  const { formState } = useFormContext();
  const submitErrors = Object.entries(formState?.errors || {}).filter(
    ([name]) => name === "root" || name === "submit",
  );
  if (!submitErrors.length) return null;
  return (
    <div
      style={{
        padding: "1.5em",
        fontSize: "14px",
        color: "white",
        backgroundColor: "darkred",
      }}
    >
      {submitErrors.map(([name, error]) => (
        <p key={name}>{error.message?.replace(/{label}/gi, name)}</p>
      ))}
    </div>
  );
};

export default FormErrors;
