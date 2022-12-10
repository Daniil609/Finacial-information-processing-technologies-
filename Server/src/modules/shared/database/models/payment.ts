import {
  Sequelize,
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

export class PaymentModel extends Model<
  InferAttributes<PaymentModel>,
  InferCreationAttributes<PaymentModel>
> {
  declare id: CreationOptional<string>;
  declare amount: number;
  declare user_id: number;
  declare status: string;
  declare currency: string;
  declare payment_details: object;
  declare payment_type: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export type PaymentModelPlain = InferAttributes<PaymentModel>;

export const init = (sequelize: Sequelize) => {
  return sequelize.define<PaymentModel>(
    'Payments',
    {
      id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      currency: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      payment_details: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      payment_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tableName: 'payments',
      schema: process.env.DB_SCHEMA,
      underscored: true,
    },
  );
};
