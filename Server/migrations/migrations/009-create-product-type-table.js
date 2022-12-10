/* eslint-disable @typescript-eslint/no-var-requires */

const { Sequelize } = require('sequelize');
const { withTransaction } = require('../utils');

const TABLE_NAME = 'product_type';
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

    await queryInterface.sequelize.query(
      `INSERT INTO trpo.product_type (id, name, created_at, updated_at)
    VALUES (DEFAULT, 'clothes', DEFAULT, DEFAULT);`,
      { transaction },
    );
    await queryInterface.sequelize.query(
      `INSERT INTO trpo.product_type (id, name, created_at, updated_at)
    VALUES (DEFAULT, 'toys', DEFAULT, DEFAULT);`,
      { transaction },
    );
  }),
  down: withTransaction(async (queryInterface, DataTypes, transaction) => {
    return queryInterface.dropTable(target, { transaction });
  }),
};
