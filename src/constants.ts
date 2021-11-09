export const APP_ENV = process.env.NEXT_PUBLIC_APP_ENV as
  | 'test'
  | 'develop'
  | 'staging'
  | 'production';

export const APP_NAME = 'codingInterview202111' as string;

export const APP_BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL as string;
// prettier-ignore
export const APP_API_BASE_URL = process.env.NEXT_PUBLIC_APP_API_BASE_URL as string;
