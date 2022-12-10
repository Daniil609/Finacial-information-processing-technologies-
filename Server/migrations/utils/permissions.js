/* eslint-disable @typescript-eslint/no-var-requires */

const { QueryTypes } = require('sequelize');

const TABLE_NAME = 'permissions';
const DB_SCHEMA = process.env.DB_SCHEMA;

const PERMISSION_LEVEL = {
  OFF: 'Off',
  ON: 'On',
  READ: 'Read',
  WRITE: 'Write',
  DELETE: 'Delete',
};

const PERMISSION_LEVELS_FULL_CRUD = [
  PERMISSION_LEVEL.OFF,
  PERMISSION_LEVEL.READ,
  PERMISSION_LEVEL.WRITE,
  PERMISSION_LEVEL.DELETE,
];

const PERMISSION_LEVELS_ON_OFF = [PERMISSION_LEVEL.OFF, PERMISSION_LEVEL.ON];

const rowToSqlInsert = (row) => {
  const { code, name, levels_text, seq } = row;
  const levelTextValues = levels_text.map((x) => `'${x}'`);
  return `'${code}', '${name}', ARRAY [${levelTextValues}], ${seq}`;
};

const insertPermissions = async (rows, { queryInterface, transaction }) => {
  const rowsSql = rows
    .map(rowToSqlInsert)
    .map((x) => `(${x})`)
    .join();
  const insertPermissionsSQL = `
    INSERT INTO "${DB_SCHEMA}"."${TABLE_NAME}"
    (code, name, levels_text, seq)
    VALUES ${rowsSql}
  `;

  await queryInterface.sequelize.query(insertPermissionsSQL, {
    type: QueryTypes.INSERT,
    transaction,
  });
};

module.exports = {
  PERMISSION_LEVEL,
  PERMISSION_LEVELS_FULL_CRUD,
  PERMISSION_LEVELS_ON_OFF,
  insertPermissions,
};
