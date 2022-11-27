import { PROVIDERS } from '../../../constants/providers';
import { DatabaseService } from './database.service';
import { getModels } from './get-models';

export const ModelsProvider = {
  provide: PROVIDERS.MODELS,
  useFactory: (databaseService: DatabaseService) => {
    const sequelize = databaseService.getSequelize();
    const models = getModels(sequelize);
    return models;
  },
  inject: [DatabaseService],
};
