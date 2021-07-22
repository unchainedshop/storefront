import getConfig from 'next/config';

const {
  publicRuntimeConfig: { FRONTEND_URL, NEXT_PUBLIC_VERCEL_URL },
} = getConfig();

const WINDOW_ORIGIN =
  (typeof window !== 'undefined' && window.location.origin) || '';

console.log('URLS', FRONTEND_URL, NEXT_PUBLIC_VERCEL_URL, WINDOW_ORIGIN);

const getCurrentDomain = () =>
  FRONTEND_URL || `https://${NEXT_PUBLIC_VERCEL_URL}` || WINDOW_ORIGIN;

export default getCurrentDomain;
