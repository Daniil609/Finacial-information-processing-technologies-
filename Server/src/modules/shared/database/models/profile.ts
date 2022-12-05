import {
  Sequelize,
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

export class ProfileModel extends Model<
  InferAttributes<ProfileModel>,
  InferCreationAttributes<ProfileModel>
> {
  declare id: CreationOptional<string>;
  declare name: CreationOptional<string>;
  declare phone: CreationOptional<string>;
  declare address_id: CreationOptional<string>;
  declare user_id: number;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export type ProfileModelPlain = InferAttributes<ProfileModel>;

export const init = (sequelize: Sequelize) => {
  return sequelize.define<ProfileModel>(
    'Profile',
    {
      id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tableName: 'profiles',
      schema: process.env.DB_SCHEMA,
      underscored: true,
    },
  );
};
