import { SetMetadata } from '@nestjs/common';
import { UserPermissionItem } from '../../../interfaces';

export const Permissions = (...permissions: UserPermissionItem[]) =>
  SetMetadata('permissions', permissions);
