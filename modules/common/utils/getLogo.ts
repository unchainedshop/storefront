import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const getLogo = () => publicRuntimeConfig.logo ?? process.env.NEXT_PUBLIC_LOGO;

export default getLogo;
