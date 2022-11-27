export default () => ({
  APP_NAME: process.env.APP_NAME,
  NODE_ENV: process.env.NODE_ENV,
  ENV: process.env.ENV,

  // Logging
  LOG_LEVEL: process.env.LOG_LEVEL,

  // Admin
  ADMIN_ID: process.env.ADMIN_ID,

  // Database
  DATABASE: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
  },
});
