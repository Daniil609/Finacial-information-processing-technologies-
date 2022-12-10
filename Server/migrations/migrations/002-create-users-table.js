/* eslint-disable @typescript-eslint/no-var-requires */
const { Sequelize } = require('sequelize');
const { withTransaction } = require('../utils');
const { hash } = require('bcrypt');
const { Logger } = require('@nestjs/common');

const TABLE_NAME = 'users';
const DB_SCHEMA = process.env.DB_SCHEMA;
const target = { tableName: TABLE_NAME, schema: DB_SCHEMA };

module.exports = {
  up: withTransaction(async (queryInterface, DataTypes, transaction) => {
    await queryInterface.createTable(
      target,
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
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
      {
        transaction,
        hooks: {
          beforeSave: async function (user, options) {
            console.log(
              `TEST: user password will be changed from ${user.getDataValue('password')} to ${
                user.password
              }`,
            );
            Logger.log(
              `TEST: user password will be changed from ${user.getDataValue('password')} to ${
                user.password
              }`,
            );
            if (user.changed('password')) {
              user.setDataValue('password', await hash(user.password, 12));
            }
          },
        },
      },
    );
  }),
  down: withTransaction(async (queryInterface, DataTypes, transaction) => {
    await queryInterface.dropTable(target, { transaction });
  }),
};
