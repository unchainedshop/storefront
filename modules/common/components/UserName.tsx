import { useState } from 'react';
import { useIntl } from 'react-intl';
import useSetUsername from '../../auth/hooks/useSetUsername';
import Button from './Button';

const UserName = ({ user }) => {
  const { formatMessage } = useIntl();
  const { setUsername } = useSetUsername();

  const [updateUsername, setUpdateUserName] = useState(false);
  const [username, setUserName] = useState('');

  const updateName = async (name) => {
    await setUsername({ username: name, userId: user._id });
    setUpdateUserName(!updateUsername);
  };

  return (
    <>
      <h2 className="my-0 text-sm font-medium capitalize text-slate-500 dark:text-slate-200">
        {formatMessage({
          id: 'username',
          defaultMessage: 'username',
        })}
      </h2>

      {!updateUsername ? (
        <>
          <div className="my-1 flex text-sm text-slate-900 dark:text-slate-100 sm:my-0">
            {user?.username ||
              formatMessage({
                id: 'no_username_set',
                defaultMessage: 'No username set',
              })}
          </div>
          <Button
            text={formatMessage({
              id: 'change_username',
              defaultMessage: 'Change username',
            })}
            type="button"
            className="justify-end border-0 py-0 px-0 text-base font-medium text-purple-600 shadow-none outline-0 hover:text-purple-500 focus:text-purple-500 dark:text-purple-400 "
            onClick={() => setUpdateUserName(!updateUsername)}
          />
        </>
      ) : (
        <>
          <input
            className="block w-full rounded-md border border-solid border-slate-900 bg-slate-100 py-2 px-2 text-sm placeholder-slate-500 transition focus:border-slate-900 focus:text-slate-900 focus:placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 dark:text-slate-600"
            type="text"
            onChange={(e) => setUserName(e.target.value)}
            value={username}
          />
          <div className="flex items-center justify-end">
            <Button
              text={formatMessage({
                id: 'cancel',
                defaultMessage: 'Cancel',
              })}
              type="button"
              className="border-0 py-0 px-0 font-bold text-red-400 shadow-none hover:text-red-600"
              onClick={() => setUpdateUserName(!updateUsername)}
            />
            <span
              className="text-slate-300 dark:text-slate-200"
              aria-hidden="true"
            >
              |
            </span>
            <Button
              type="button"
              className="border-0 py-0 px-0 font-bold text-purple-600 shadow-none dark:text-purple-400"
              onClick={() => updateName(username)}
              text={formatMessage({
                id: 'save',
                defaultMessage: 'Save',
              })}
            />
          </div>
        </>
      )}
    </>
  );
};

export default UserName;
