import * as _ from 'lodash';
import { PERMISSION_CODE, PERMISSION_LEVEL } from '../../../src/constants';
import { TEST_USER_ID } from '../../constants';
import { Api } from '../../helpers/api';
import { createUser } from '../../helpers/create-user';
import { setupHooksForE2e } from '../../helpers/hooks';

let api: Api;

describe('E2E. Permissions', () => {
  const e2eHookData = setupHooksForE2e();

  beforeAll(async () => {
    ({ api } = e2eHookData);
  });

  describe('GET /v1/permissions', () => {
    describe('Validation', () => {
      it('Should send 401 if unauthorized', async () => {
        api.logout();
        const response = await api.request.getPermissions();
        expect(response.statusCode).toBe(401);
        await api.login(TEST_USER_ID);
      });

      it('Should send 403 if not enough permissions', async () => {
        // Create user with not enough permissions and login with it
        const createdUser = await createUser({
          permissions: { [PERMISSION_CODE.PERMISSIONS]: PERMISSION_LEVEL.OFF },
        });
        await api.login(createdUser.id);

        // Test endpoint returns 403
        const response = await api.request.getPermissions();
        expect(response.statusCode).toBe(403);

        // Login back with test user with all permissions
        await api.login(TEST_USER_ID);
      });
    });

    it('Should get all permissions', async () => {
      const response = await api.request.getPermissions();

      expect(response.statusCode).toBe(200);
      for (const row of response.body) {
        expect(row).toHaveProperty('id');
        expect(row).toHaveProperty('name');
        expect(row).toHaveProperty('code');
        expect(row).toHaveProperty('levelsText');
        expect(row).toHaveProperty('seq');
      }
    });

    it('All permissions should be sorted by seq', async () => {
      const response = await api.request.getPermissions();

      let responseCopy = [...response.body];
      responseCopy = _.sortBy(responseCopy, 'seq');

      const responseIds = response.body.map((x) => x.id);
      const responseCopyIds = responseCopy.map((x) => x.id);
      expect(responseIds).toEqual(responseCopyIds);
    });
  });
});
