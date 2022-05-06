import classNames from 'classnames';

const Button = ({
  text,
  disabled = false,
  type = 'button',
  className = '',
  onClick,
}) => {
  return (
    <button
      className={classNames(
        'inline-flex cursor-pointer appearance-none items-center justify-center rounded-md border py-2 px-4 text-center text-base font-bold uppercase tracking-[1px] shadow-sm transition',
        {
          'cursor-not-allowed opacity-30 outline-none': disabled,
        },
        className,
      )}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
