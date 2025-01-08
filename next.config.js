import fs from "fs";
await import("./node_env.js");

const {
  GRAPHQL_ENDPOINT,
  NODE_ENV,
  SKIP_INVALID_REMOTES,
  UNCHAINED_ENDPOINT,
  UNCHAINED_CREATE_THEME,
  DISABLE_EMAIL_PROCESSES,
} = process.env;

const theme = JSON.parse(UNCHAINED_CREATE_THEME);

// localizations
const localizations = Object.fromEntries(
  Object.keys(theme.locales).map((locale) => {
    const text = fs.readFileSync(`.${theme.locales[locale]}`);
    return [locale, JSON.parse(text)];
  }),
);

const nextJsConfig = {
  serverRuntimeConfig: {},
  publicRuntimeConfig: {
    GRAPHQL_ENDPOINT,
    NODE_ENV,
    SKIP_INVALID_REMOTES: JSON.parse(SKIP_INVALID_REMOTES || "false"),
    UNCHAINED_ENDPOINT,
    theme,
    localizations,
    disableEmailSupport: !!DISABLE_EMAIL_PROCESSES,
  },
  i18n: {
    locales: Object.keys(theme.locales),
    defaultLocale: Object.keys(theme.locales)[0],
  },
};

export default nextJsConfig;
