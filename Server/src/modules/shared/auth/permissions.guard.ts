import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtUser, UserPermissionItem } from '../../../interfaces';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permissions = this.reflector.get<UserPermissionItem[]>(
      'permissions',
      context.getHandler(),
    );

    if (!permissions) return true;

    const request = context.switchToHttp().getRequest();
    const user: JwtUser = request.user;

    const enoughPermissions = permissions.every(([code, level]) => {
      return hasPermission(user.permissionMap, code, level);
    });

    if (!enoughPermissions) throw new ForbiddenException();

    return true;
  }
}

const hasPermission = (userPermissionMap, code, requiredLevel) => {
  return userPermissionMap[code] >= requiredLevel;
};
