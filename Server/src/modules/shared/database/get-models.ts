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
  initRegionModel,
  RegionModel,
} from './models';

export interface Models {
  User: ModelStatic<UserModel>;
  Permission: ModelStatic<PermissionModel>;
  UserPermission: ModelStatic<UserPermissionModel>;
  Profile: ModelStatic<ProfileModel>;
  Region: ModelStatic<RegionModel>;
}

export const getModels = (sequelize: Sequelize) => {
  const User = initUserModel(sequelize);
  const Permission = initPermissionModel(sequelize);
  const UserPermission = initUserPermissionModel(sequelize);
  const Profile = initProfileModel(sequelize);
  const Region = initRegionModel(sequelize);

  const models: Models = {
    User,
    Permission,
    UserPermission,
    Profile,
    Region,
  };

  // relations
  User.hasMany(UserPermission, { as: 'userPermissions', foreignKey: 'userId' });

  Permission.hasMany(UserPermission, { as: 'userPermissions', foreignKey: 'permissionId' });

  UserPermission.belongsTo(Permission, { as: 'permission', foreignKey: 'permissionId' });
  UserPermission.belongsTo(User, { as: 'user', foreignKey: 'userId' });

  User.hasOne(Profile, { as: 'profile', foreignKey: 'id' });
  Profile.belongsTo(User, { as: 'user', foreignKey: 'userId' });

  Profile.hasOne(Region, { as: 'region', foreignKey: 'id' });
  Region.belongsTo(Profile, { as: 'profile', foreignKey: 'address_id' });

  return models;
};
