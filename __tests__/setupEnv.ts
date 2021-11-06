import { loadEnvConfig } from '@next/env';

export default async (): Promise<void> => {
  process.env.TZ = 'Asia/Tokyo'; // not work on under v12
  loadEnvConfig(process.env.PWD || process.cwd());
};
