import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { getModels } from '../../src/modules/shared/database/get-models';
import { setupNestApp } from '../../src/utils/app';
import { DatabaseManager } from './database-manager';

export const databaseManager = new DatabaseManager();

export const createTestingAppModule = async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();
  setupNestApp(app);
  await app.init();

  return app;
};

export const models = getModels(databaseManager.sequelize);
