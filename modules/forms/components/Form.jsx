import { useFormContext } from '../lib/useFormWithContext';

const Form = ({ children, onSubmit }) => {
  const { handleSubmit } = useFormContext();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      {children}
    </form>
  );
};

export default Form;
