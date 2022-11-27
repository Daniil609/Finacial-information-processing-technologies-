import { INestApplication } from '@nestjs/common';
import { TEST_USER_ID } from '../constants';
import { Api } from './api';
import { createTestingAppModule, databaseManager } from './dependencies';

export const setupHooksForE2e = (): E2eHooksData => {
  // Used 'any' to disable type check for initial assignment that
  // happen in beforeAll, not immediately
  const initData: any = {};

  beforeAll(async () => {
    await databaseManager.truncateAll();

    initData.app = await createTestingAppModule();
    initData.api = new Api(initData.app);

    await initData.api.login(TEST_USER_ID);
  });

  afterAll(async () => {
    await initData.app.close();
  });

  return initData;
};

interface E2eHooksData {
  api: Api;
  app: INestApplication;
}
