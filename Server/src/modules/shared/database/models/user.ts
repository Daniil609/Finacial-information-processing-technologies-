import {
  Sequelize,
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { hash } from 'bcrypt';
import { Logger } from '@nestjs/common';

export class UserModel extends Model<
  InferAttributes<UserModel>,
  InferCreationAttributes<UserModel>
> {
  declare id: CreationOptional<string>;
  declare username: string;
  declare email: string;
  declare password: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export type UserModelPlain = InferAttributes<UserModel>;

export const init = (sequelize: Sequelize) => {
  return sequelize.define<UserModel>(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tableName: 'users',
      schema: process.env.DB_SCHEMA,
      underscored: true,
      hooks: {
        beforeSave: async function (user, options) {
          Logger.log(
            `TEST: user password will be changed from ${user.getDataValue('password')} to ${
              user.password
            }`,
          );
          if (user.changed('password')) {
            user.setDataValue('password', await hash(user.password, 12));
          }
        },
      },
    },
  );
};
