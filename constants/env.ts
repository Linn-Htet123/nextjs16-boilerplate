const env = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
  APP_ENV: process.env.NEXT_PUBLIC_APP_ENv || "development",
} as const;

export default env;
