import dotenv from "dotenv-extended";

dotenv.load({
  silent: process.env.SUPPRESS_ENV_ERRORS,
  errorOnMissing: !process.env.SUPPRESS_ENV_ERRORS,
  errorOnRegex: !process.env.SUPPRESS_ENV_ERRORS,
  errorOnExtra: false,
  includeProcessEnv: true,
});

await import("./file_env.js");
