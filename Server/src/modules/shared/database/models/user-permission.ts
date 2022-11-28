import {
  Sequelize,
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
} from 'sequelize';
import { PERMISSION_LEVEL } from '../../../../constants';
import { PermissionModel } from './permission';

export class UserPermissionModel extends Model<
  InferAttributes<UserPermissionModel>,
  InferCreationAttributes<UserPermissionModel>
> {
  declare id: CreationOptional<string>;
  declare user_id: string;
  declare permissionId: string;
  declare level: PERMISSION_LEVEL;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  // relations
  declare permission: NonAttribute<PermissionModel>;
}

export type UserPermissionModelPlain = InferAttributes<UserPermissionModel>;

export const init = (sequelize: Sequelize) => {
  return sequelize.define<UserPermissionModel>(
    'UserPermission',
    {
      id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      user_id: {
        type: DataTypes.UUIDV4,
        allowNull: false,
      },
      permissionId: {
        type: DataTypes.UUIDV4,
        allowNull: false,
      },
      level: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tableName: 'user_permissions',
      schema: process.env.DB_SCHEMA,
      underscored: true,
    },
  );
};
