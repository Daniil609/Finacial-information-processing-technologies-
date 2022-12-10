/* eslint-disable @typescript-eslint/no-var-requires */

const { Sequelize } = require('sequelize');
const { withTransaction } = require('../utils');

const TABLE_NAME = 'messages';
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
