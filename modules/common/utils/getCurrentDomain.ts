import getConfig from 'next/config';

const {
  publicRuntimeConfig: { FRONTEND_URL },
} = getConfig();

const WINDOW_ORIGIN =
  (typeof window !== 'undefined' && window.location.origin) || '';

const getCurrentDomain = () => FRONTEND_URL || WINDOW_ORIGIN;

export default getCurrentDomain;
