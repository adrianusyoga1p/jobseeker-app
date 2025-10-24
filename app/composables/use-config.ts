import production from "../config/env/production";
import staging from "../config/env/staging";

export default () => {
  const { public: config } = useRuntimeConfig();

  let envConfig: ENVConfig = staging;
  if (config.env === "production")
    envConfig = production;

  return {
    env: config.env,
    isProduction: config.env === "production",

    // Environtment Config
    ...envConfig,
  };
};
