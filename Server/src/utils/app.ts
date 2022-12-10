import { INestApplication, RequestMethod, VersioningType } from '@nestjs/common';

/**
 * Method to be reused in main.ts and tests to have same setup.
 * Don't extend it with a code that's not needed in be executed in tests,
 * modify src/main.ts instead.
 */
export const setupNestApp = (app: INestApplication) => {
  app.setGlobalPrefix('api', {
    exclude: [{ path: 'info', method: RequestMethod.GET }],
  });
  app.enableVersioning({ type: VersioningType.URI });
  app.enableShutdownHooks();
};
