import * as dotenv from 'dotenv';
import { TEST_USER_ID } from './constants';
import { createUser } from './helpers/create-user';
import { databaseManager, models } from './helpers/dependencies';

dotenv.config();

export default async () => {
  // Hack to see first log message in a new line
  console.log('\n');

  await reapplyMigrations();
  await createTestUser();
};

const reapplyMigrations = async () => {
  await databaseManager.undoAllMigrations();
  await databaseManager.applyAllMigrations();
};

const createTestUser = async () => {
  const userAlreadyExists = await models.User.findByPk(TEST_USER_ID);

  // In case user already exists - don't create it.
  // It's convenient for dev purposes when reapplyMigrations() is
  // commented in jest-setup.js to speed up tests execution.
  if (userAlreadyExists) return userAlreadyExists.get({ plain: true });

  await createUser({ permissions: 'ALL' }, { id: TEST_USER_ID });
};
