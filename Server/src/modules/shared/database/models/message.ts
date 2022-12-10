import {
  Sequelize,
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

export class MessageModel extends Model<
  InferAttributes<MessageModel>,
  InferCreationAttributes<MessageModel>
> {
  declare id: CreationOptional<string>;
  declare text: string;
  declare user_from_id: number;
  declare user_to_id: number;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export type MessageModelPlain = InferAttributes<MessageModel>;

export const init = (sequelize: Sequelize) => {
  return sequelize.define<MessageModel>(
    'Messages',
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
      user_from_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_to_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tableName: 'messages',
      schema: process.env.DB_SCHEMA,
      underscored: true,
    },
  );
};
