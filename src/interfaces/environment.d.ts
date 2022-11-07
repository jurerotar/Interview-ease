/* eslint-disable no-unused-vars */

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_APP_URL: 'http://localhost:3000';
      NEXT_PUBLIC_ENVIRONMENT: 'local' | 'production';
    }
  }
}

export {};
