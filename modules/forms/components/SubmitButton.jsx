import { useFormContext } from 'react-hook-form';

const SubmitButton = ({ children }) => {
  const {
    formState: { errors, isValid },
  } = useFormContext();
  return (
    <button
      disabled={!isValid || Object.keys(errors).length}
      type="submit"
      className="group relative flex w-full justify-center rounded-md border border-transparent bg-slate-500 py-2 px-4 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
    >
      {children}
    </button>
  );
};

export default SubmitButton;
