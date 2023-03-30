import { BadgeCheckIcon, XCircleIcon } from '@heroicons/react/solid';
import classNames from 'classnames';

const Verified = ({
  isActive,
  activeIcon = '',
  inActiveIcon = '',
  activeClassName = '',
  inActiveClassName = '',
  containerClassName = '',
  iconClassName = '',
}) => {
  return (
    <span className={classNames('', containerClassName)}>
      {isActive
        ? activeIcon || (
            <BadgeCheckIcon
              className={classNames(
                'h-5 w-5 text-green-400',
                iconClassName,
                activeClassName,
              )}
            />
          )
        : inActiveIcon || (
            <XCircleIcon
              className={classNames(
                'h-5 w-5 text-red-400',
                iconClassName,
                inActiveClassName,
              )}
            />
          )}
    </span>
  );
};

export default Verified;
