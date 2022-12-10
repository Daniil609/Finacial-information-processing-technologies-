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
  initProductModel,
  ProductModel,
  initProductTypeModel,
  ProductTypeModel,
  initCommentModel,
  CommentModel,
  initMessageModel,
  MessageModel,
} from './models';

export interface Models {
  User: ModelStatic<UserModel>;
  Permission: ModelStatic<PermissionModel>;
  UserPermission: ModelStatic<UserPermissionModel>;
  Profile: ModelStatic<ProfileModel>;
  Region: ModelStatic<RegionModel>;
  Product: ModelStatic<ProductModel>;
  ProductType: ModelStatic<ProductTypeModel>;
  Comment: ModelStatic<CommentModel>;
  Message: ModelStatic<MessageModel>;
}

export const getModels = (sequelize: Sequelize) => {
  const User = initUserModel(sequelize);
  const Permission = initPermissionModel(sequelize);
  const UserPermission = initUserPermissionModel(sequelize);
  const Profile = initProfileModel(sequelize);
  const Region = initRegionModel(sequelize);
  const Product = initProductModel(sequelize);
  const ProductType = initProductTypeModel(sequelize);
  const Comment = initCommentModel(sequelize);
  const Message = initMessageModel(sequelize);

  const models: Models = {
    User,
    Permission,
    UserPermission,
    Profile,
    Region,
    Product,
    ProductType,
    Comment,
    Message,
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

  Product.belongsTo(User, { as: 'user', foreignKey: 'user_id' });
  User.hasMany(Product, { as: 'userProducts', foreignKey: 'user_id' });

  ProductType.belongsTo(Product, { as: 'productType', foreignKey: 'id' });
  Product.hasOne(ProductType, { as: 'productType', foreignKey: 'type_id' });

  Comment.belongsTo(Product, { as: 'product', foreignKey: 'product_id' });
  Product.hasMany(Comment, { as: 'comment', foreignKey: 'id' });

  Message.belongsTo(User, { as: 'user', foreignKey: 'user_from_id' });
  User.hasMany(Message, { as: 'userMessages', foreignKey: 'user_id' });

  return models;
};
