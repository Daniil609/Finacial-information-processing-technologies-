import {
  Sequelize,
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

export class ProductTypeModel extends Model<
  InferAttributes<ProductTypeModel>,
  InferCreationAttributes<ProductTypeModel>
> {
  declare id: CreationOptional<string>;
  declare name: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export type ProductTypeModelPlain = InferAttributes<ProductTypeModel>;

export const init = (sequelize: Sequelize) => {
  return sequelize.define<ProductTypeModel>(
    'Product_type',
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
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tableName: 'product_type',
      schema: process.env.DB_SCHEMA,
      underscored: true,
    },
  );
};
