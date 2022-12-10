/* eslint-disable @typescript-eslint/no-var-requires */

const { withTransaction } = require('../utils');
const {
  insertPermissions,
  PERMISSION_LEVELS_FULL_CRUD,
  PERMISSION_LEVELS_ON_OFF,
  PERMISSION_LEVEL,
} = require('../utils/permissions');

const TABLE_NAME = 'permissions';
const DB_SCHEMA = process.env.DB_SCHEMA;
const target = { tableName: TABLE_NAME, schema: DB_SCHEMA };

module.exports = {
  up: withTransaction(async (queryInterface, DataTypes, transaction) => {
    const permissions = [
      {
        code: 'positions',
        name: 'Positions',
        levels_text: PERMISSION_LEVELS_FULL_CRUD,
        seq: 0,
      },
      {
        code: 'skills',
        name: 'Skills',
        levels_text: PERMISSION_LEVELS_FULL_CRUD,
        seq: 1,
      },
      {
        code: 'users',
        name: 'Users',
        levels_text: [PERMISSION_LEVEL.OFF, PERMISSION_LEVEL.READ],
        seq: 2,
      },
      {
        code: 'assign_employees',
        name: 'Assign employees',
        levels_text: PERMISSION_LEVELS_ON_OFF,
        seq: 3,
      },
      {
        code: 'manager',
        name: 'Manager',
        levels_text: PERMISSION_LEVELS_ON_OFF,
        seq: 4,
      },
      {
        code: 'permissions',
        name: 'Permissions',
        levels_text: [PERMISSION_LEVEL.OFF, PERMISSION_LEVEL.READ, PERMISSION_LEVEL.WRITE],
        seq: 5,
      },
    ];

    await insertPermissions(permissions, { queryInterface, transaction });
  }),
  down: withTransaction(async (queryInterface, DataTypes, transaction) => {
    return queryInterface.dropTable(target, { transaction });
  }),
};
