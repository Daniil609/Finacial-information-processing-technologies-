import {
  Sequelize,
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { PERMISSION_LEVEL_TEXT } from '../../../../constants';
import { PermissionCode } from '../../../../interfaces';

export class PermissionModel extends Model<
  InferAttributes<PermissionModel>,
  InferCreationAttributes<PermissionModel>
> {
  declare id: CreationOptional<string>;
  declare code: PermissionCode;
  declare name: string;
  declare levelsText: PERMISSION_LEVEL_TEXT[];
  declare seq: number;

  declare createdAt: CreationOptional<Date>;
}

export type PermissionModelPlain = InferAttributes<PermissionModel>;

export const init = (sequelize: Sequelize) => {
  return sequelize.define<PermissionModel>(
    'Permission',
    {
      id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      levelsText: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      seq: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
    },
    {
      tableName: 'permissions',
      schema: process.env.DB_SCHEMA,
      underscored: true,
      updatedAt: false,
    },
  );
};
