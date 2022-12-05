import { Sequelize } from 'sequelize';
import { ModelStatic } from 'sequelize/types';

import {
  initPermissionModel,
  initUserModel,
  initUserPermissionModel,
  PermissionModel,
  UserModel,
  UserPermissionModel,
  initProfileModel,
  ProfileModel,
} from './models';

export interface Models {
  User: ModelStatic<UserModel>;
  Permission: ModelStatic<PermissionModel>;
  UserPermission: ModelStatic<UserPermissionModel>;
  Profile: ModelStatic<ProfileModel>;
}

export const getModels = (sequelize: Sequelize) => {
  const User = initUserModel(sequelize);
  const Permission = initPermissionModel(sequelize);
  const UserPermission = initUserPermissionModel(sequelize);
  const Profile = initProfileModel(sequelize);

  const models: Models = {
    User,
    Permission,
    UserPermission,
    Profile,
  };

  // relations
  User.hasMany(UserPermission, { as: 'userPermissions', foreignKey: 'userId' });

  Permission.hasMany(UserPermission, { as: 'userPermissions', foreignKey: 'permissionId' });

  UserPermission.belongsTo(Permission, { as: 'permission', foreignKey: 'permissionId' });
  UserPermission.belongsTo(User, { as: 'user', foreignKey: 'userId' });

  User.hasOne(Profile, { as: 'profile', foreignKey: 'id' });
  Profile.belongsTo(User, { as: 'user', foreignKey: 'userId' });

  return models;
};
