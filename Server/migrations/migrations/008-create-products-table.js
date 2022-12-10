/* eslint-disable @typescript-eslint/no-var-requires */

const { Sequelize } = require('sequelize');
const { withTransaction } = require('../utils');

const TABLE_NAME = 'products';
const DB_SCHEMA = process.env.DB_SCHEMA;
const target = { tableName: TABLE_NAME, schema: DB_SCHEMA };

module.exports = {
  up: withTransaction(async (queryInterface, DataTypes, transaction) => {
    await queryInterface.createTable(
      target,
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.literal('uuid_generate_v4()'),
          primaryKey: true,
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
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('NOW'),
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('NOW'),
        },
      },
      { transaction },
    );
  }),
  down: withTransaction(async (queryInterface, DataTypes, transaction) => {
    return queryInterface.dropTable(target, { transaction });
  }),
};
