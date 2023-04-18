import { useIntl } from 'react-intl';

const LinkedInOauth = ({ providers }) => {
  const { formatMessage } = useIntl();
  const googleClientProvider = (providers || []).find(
    ({ name }) => name === 'linkedin',
  );
  if (!googleClientProvider) return null;

  const { clientId } = googleClientProvider;

  const redirectUrl = `${window.location.origin}/oauth`;
  return (
    <a
      href={`https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUrl}&state=linkedin&scope=r_liteprofile%20r_emailaddress%20openid%20profile%20email`.replaceAll(
        ' ',
        '',
      )}
      className="group relative flex w-full rounded-md border border-stone-300 hover:bg-stone-50 py-2 px-4 items-center font-medium  focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
    >
      <svg
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        className="h-10 w-10"
      >
        <path
          fill="#0A66C2"
          d="M12.225 12.225h-1.778V9.44c0-.664-.012-1.519-.925-1.519-.926 0-1.068.724-1.068 1.47v2.834H6.676V6.498h1.707v.783h.024c.348-.594.996-.95 1.684-.925 1.802 0 2.135 1.185 2.135 2.728l-.001 3.14zM4.67 5.715a1.037 1.037 0 01-1.032-1.031c0-.566.466-1.032 1.032-1.032.566 0 1.031.466 1.032 1.032 0 .566-.466 1.032-1.032 1.032zm.889 6.51h-1.78V6.498h1.78v5.727zM13.11 2H2.885A.88.88 0 002 2.866v10.268a.88.88 0 00.885.866h10.226a.882.882 0 00.889-.866V2.865a.88.88 0 00-.889-.864z"
        />
      </svg>
      <span className="w-full text-center">
        {formatMessage({
          id: 'log-in-with-linkedin',
          defaultMessage: 'Log in with LinkedIn',
        })}
      </span>
    </a>
  );
};

export default LinkedInOauth;