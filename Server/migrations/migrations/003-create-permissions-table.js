/* eslint-disable @typescript-eslint/no-var-requires */

const { Sequelize } = require('sequelize');
const { withTransaction } = require('../utils');

const TABLE_NAME = 'permissions';
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
        code: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        levels_text: {
          type: DataTypes.ARRAY(DataTypes.TEXT),
          allowNull: false,
        },
        seq: {
          type: DataTypes.INTEGER,
          allowNull: false,
          unique: true,
        },
        created_at: {
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
