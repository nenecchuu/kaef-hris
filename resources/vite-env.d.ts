/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_APP_URL: string;
  VITE_APP_NAME: string;
  VITE_APP_ENV: string;
  VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
