import {
  Sequelize,
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

export class RegionModel extends Model<
  InferAttributes<RegionModel>,
  InferCreationAttributes<RegionModel>
> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare type: string;
  declare parent_id: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export type RegionModelPlain = InferAttributes<RegionModel>;

export const init = (sequelize: Sequelize) => {
  return sequelize.define<RegionModel>(
    'Region',
    {
      id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      parent_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tableName: 'regions',
      schema: process.env.DB_SCHEMA,
      underscored: true,
    },
  );
};
