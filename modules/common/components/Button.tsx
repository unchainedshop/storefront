import classNames from 'classnames';

const Button = ({ text, disabled, type, className, onClick }) => {
  return (
    <button
      className={classNames(
        'inline-flex cursor-pointer appearance-none items-center justify-center rounded-md border py-2 px-4 text-center text-base font-bold uppercase tracking-[1px] shadow-sm transition',
        {
          'cursor-not-allowed opacity-30 outline-none': disabled,
        },
        className,
      )}
      // className="align-center mr-4 mb-4 mt-4 inline-flex w-full appearance-none items-center justify-center rounded-md border border-color-brand border-transparent bg-color-brand py-2 px-4 text-center text-base font-bold uppercase tracking-[1px] text-white shadow-sm transition hover:border-color-brand-darker hover:bg-color-brand-darker focus:border-color-brand-darker focus:bg-color-brand-darker focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      // eslint-disable-next-line react/button-has-type
      type={type || 'submit'}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
