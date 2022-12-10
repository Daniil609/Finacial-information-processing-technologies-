import {
  Sequelize,
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

export class ProductModel extends Model<
  InferAttributes<ProductModel>,
  InferCreationAttributes<ProductModel>
> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare manufactureDate: Date;
  declare price: number;
  declare image: MediaImage;
  declare type_id: number;
  declare condition: string;
  declare minAge: number;
  declare maxAge: number;
  declare address_id: string;
  declare user_id: number;
  declare buyer_user_id: number;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export type ProductModelPlain = InferAttributes<ProductModel>;

export const init = (sequelize: Sequelize) => {
  return sequelize.define<ProductModel>(
    'Product',
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
      manufactureDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      image: {
        type: DataTypes.BLOB,
        allowNull: false,
      },
      type_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      condition: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      minAge: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      maxAge: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      address_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      buyer_user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tableName: 'products',
      schema: process.env.DB_SCHEMA,
      underscored: true,
    },
  );
};
