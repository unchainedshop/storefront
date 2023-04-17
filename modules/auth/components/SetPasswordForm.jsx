import { useState } from 'react';

const SetPasswordForm = ({ onSubmit }) => {
  const [newPassword, setNewPassword] = useState('');

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await onSubmit({ newPassword });
      }}
    >
      <div>
        <input
          required
          name="newPassword"
          type="password"
          id="new-password"
          placeholder="New password"
          className="mt-1 relative block w-full dark:focus:autofill dark:hover:autofill dark:autofill dark:placeholder:text-white dark:bg-slate-900 dark:text-slate-200 appearance-none rounded-md border-2 border-slate-200 dark:border-slate-700 px-4 py-2.5 text-sm  placeholder-slate-400 shadow-sm placeholder:text-slate-400 focus:border-red-400 focus:outline-none focus:ring-1 focus:ring-red-400"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>

      <div className="mt-6">
        <button
          type="submit"
          disabled={!newPassword}
          className="group relative flex w-full justify-center rounded-md border border-transparent bg-red-500 py-2 px-4 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
        >
          Passwort festlegen
        </button>
      </div>
    </form>
  );
};

export default SetPasswordForm;
