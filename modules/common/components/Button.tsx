import classNames from 'classnames';

const Button = ({
  type,
  icon = null,
  text = '',
  disabled = false,
  className = '',
  onClick = (value) => value,
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
      type={type === 'submit' ? 'submit' : 'button'}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && icon}
      {text}
    </button>
  );
};

export default Button;
