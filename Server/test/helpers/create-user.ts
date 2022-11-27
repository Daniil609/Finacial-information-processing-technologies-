import { CreationAttributes, Transaction } from 'sequelize';
import { faker } from '@faker-js/faker';
import { UserPermissionMap } from '../../src/interfaces';
import {
  UserModel,
  UserModelPlain,
  UserPermissionModel,
} from '../../src/modules/shared/database/models';
import { databaseManager, models } from './dependencies';
import { PERMISSION_TEXT_TO_LEVEL } from '../../src/constants';

/**
 * Create users with a specific permissions for tests.
 */
export const createUser = async (
  options: { permissions: UserPermissionMap | 'ALL' },
  overrides: UserOverrides = {},
): Promise<UserModelPlain> => {
  const { permissions } = options;

  return await databaseManager.sequelize.transaction(async (transaction) => {
    const createdUser = await createUserEntity(overrides, { transaction });
    await setPermissions(createdUser.id, permissions, { transaction });

    return createdUser;
  });
};

const createUserEntity = async (
  overrides: UserOverrides = {},
  options: { transaction: Transaction },
): Promise<UserModelPlain> => {
  const { id, username } = overrides;
  const { transaction } = options;

  const userPayload: CreationAttributes<UserModel> = {
    username: username || faker.name.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
  if (id) userPayload.id = id;

  const createdUser = await models.User.create(userPayload, { transaction });
  return createdUser.get({ plain: true });
};

const setPermissions = async (
  userId: string,
  permissionMap: UserPermissionMap | 'ALL',
  options: { transaction: Transaction },
) => {
  const { transaction } = options;
  let userPermissions: CreationAttributes<UserPermissionModel>[] = [];

  if (permissionMap === 'ALL') {
    const permissions = await models.Permission.findAll({ attributes: ['id', 'levelsText'] });
    userPermissions = permissions.map((p) => ({
      userId,
      permissionId: p.id,
      level: PERMISSION_TEXT_TO_LEVEL[p.levelsText[p.levelsText.length - 1]],
    }));
  } else {
    const permissions = await models.Permission.findAll({
      where: { code: Object.keys(permissionMap) },
    });
    userPermissions = permissions.map((p) => {
      return {
        userId,
        permissionId: p.id,
        level: permissionMap[p.code],
      };
    });
  }

  await models.UserPermission.bulkCreate(userPermissions, { transaction });
};

type UserOverrides = Partial<Pick<UserModel, 'id' | 'username'>>;
