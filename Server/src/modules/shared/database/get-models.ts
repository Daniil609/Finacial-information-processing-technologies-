import { Sequelize } from 'sequelize';
import { ModelStatic } from 'sequelize/types';

import {
  initPermissionModel,
  initUserModel,
  initUserPermissionModel,
  PermissionModel,
  UserModel,
  UserPermissionModel,
} from './models';

export interface Models {
  User: ModelStatic<UserModel>;
  Permission: ModelStatic<PermissionModel>;
  UserPermission: ModelStatic<UserPermissionModel>;
}

export const getModels = (sequelize: Sequelize) => {
  const User = initUserModel(sequelize);
  const Permission = initPermissionModel(sequelize);
  const UserPermission = initUserPermissionModel(sequelize);

  const models: Models = {
    User,
    Permission,
    UserPermission,
  };

  // relations
  User.hasMany(UserPermission, { as: 'userPermissions', foreignKey: 'userId' });

  Permission.hasMany(UserPermission, { as: 'userPermissions', foreignKey: 'permissionId' });

  UserPermission.belongsTo(Permission, { as: 'permission', foreignKey: 'permissionId' });
  UserPermission.belongsTo(User, { as: 'user', foreignKey: 'userId' });

  return models;
};
