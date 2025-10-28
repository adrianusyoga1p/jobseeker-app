import production from "../config/env/production";

export default () => {
  const env = import.meta.env.MODE || "production";

  return {
    env,
    isProduction: true,
    ...production,
  };
};
