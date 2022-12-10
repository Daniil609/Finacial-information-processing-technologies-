import { databaseManager } from './helpers/dependencies';

export default async () => {
  await databaseManager.disconnect();
};
