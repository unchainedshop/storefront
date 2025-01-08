import classNames from "classnames";
import { FormProvider, useForm } from "react-hook-form";

const Form = ({
  children,
  onSubmit,
  onSubmitError,
  defaultValues,
  onBeforeSubmitValidator = null,
  className = "",
}) => {
  const context = useForm({
    mode: "onTouched",
    defaultValues,
  });

  const handler = async (data) => {
    try {
      const error =
        onBeforeSubmitValidator && (await onBeforeSubmitValidator(data));
      if (error) {
        const [key] = Object.keys(error);
        context.setError(key, error[key]);
        return;
      }

      await onSubmit(data);
    } catch (e) {
      const error = (onSubmitError && (await onSubmitError(e))) || {
        submit: {
          type: "manual",
          message: e.message,
        },
      };
      const [key] = Object.keys(error);
      context.setError(key, error[key]);
    }
  };
  return (
    <FormProvider {...context}>
      <form
        onSubmit={context.handleSubmit(handler)}
        className={classNames("form", className)}
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
