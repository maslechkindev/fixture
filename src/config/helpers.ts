import { config } from 'dotenv';
import { resolve } from 'path';
config({
  path: resolve(process.cwd(), '.env'),
});

export const getEnvVar = (varName: string, defaultValue?: string | number) =>
  process.env[varName] || defaultValue;
