import {
  Sequelize,
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

export class CommentModel extends Model<
  InferAttributes<CommentModel>,
  InferCreationAttributes<CommentModel>
> {
  declare id: CreationOptional<string>;
  declare text: string;
  declare user_id: number;
  declare product_id: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export type CommentModelPlain = InferAttributes<CommentModel>;

export const init = (sequelize: Sequelize) => {
  return sequelize.define<CommentModel>(
    'Comments',
    {
      id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      product_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tableName: 'comments',
      schema: process.env.DB_SCHEMA,
      underscored: true,
    },
  );
};
