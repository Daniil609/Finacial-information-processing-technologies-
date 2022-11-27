import { Dialect } from 'sequelize';
import { LOG_LEVEL } from '.';

export interface EnvironmentVariables {
  APP_NAME: string;
  ENV: string;
  NODE_ENV: 'development' | 'production';
  // logging
  LOG_LEVEL: LOG_LEVEL;
  // Database
  DATABASE: DatabaseSettings;
  // Admin
  ADMIN_ID: string;
}

interface DatabaseSettings {
  dialect: Dialect;
  database: string;
  username: string;
  password: string;
  host: string;
  port: number;
}
