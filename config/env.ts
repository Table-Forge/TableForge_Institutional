export type TEnvironment = "dev" | "prod" | "local";

const getEnvironment = (): TEnvironment => {
  const rawEnv = (
    process.env.NEXT_PUBLIC_ENV ??
    process.env.VITE_ENV ??
    process.env.NODE_ENV ??
    "local"
  ).toString();

  const normalized = rawEnv.toLowerCase().trim();

  const ENV_MAP: Record<string, TEnvironment> = {
    development: "dev",
    production: "prod",
    local: "local",
    dev: "dev",
    prod: "prod",
  };

  return ENV_MAP[normalized] ?? "local";
};

const environment = getEnvironment();

const getApiUrl = () => {
  return (
    (process.env.NEXT_PUBLIC_API_URL ??
      process.env.VITE_API_URL) as string | undefined
  ) ?? "";
};

export const ENV = {
  API_URL: getApiUrl(),
  ENVIRONMENT: environment,
};

if (!ENV.API_URL) {
  console.warn("API URL is not defined in environment variables.");
}
