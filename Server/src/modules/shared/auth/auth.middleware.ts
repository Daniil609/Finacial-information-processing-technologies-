import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { PROVIDERS } from '../../../constants/providers';
import { JwtUser, UserPermissionMap } from '../../../interfaces';
import { Models } from '../database/get-models';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(@Inject(PROVIDERS.MODELS) private models: Models) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authorizationHeader: undefined | string = req.headers.authorization;

    Logger.log("TEST: authing", authorizationHeader);

    if (!authorizationHeader) throw new UnauthorizedException();

    const token = authorizationHeader.slice('Bearer '.length);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore-next-line
    req.user = await this.getUserFromToken(token);

    next();
  }

  async getUserFromToken(token: string): Promise<JwtUser> {
    const parsedToken = JSON.parse(token) as { id: string };
    const { id: userId } = parsedToken;

    const relatedUser = await this.models.User.findOne({
      where: { id: userId },
      attributes: ['level'],
      include: [
        {
          model: this.models.Permission,
          as: 'permission',
          attributes: ['code'],
        },
      ],
    });

    const permissions = await this.models.UserPermission.findAll({
      where: { user_id: userId },
      attributes: ['level'],
      include: [
        {
          model: this.models.Permission,
          as: 'permission',
          attributes: ['code'],
        },
      ],
    });

    if (!relatedUser) {
      throw new BadRequestException('Authentication failed');
    }

    const permissionMap = permissions.reduce((accum, current) => {
      accum[current.permission.code] = current.level;
      return accum;
    }, {} as UserPermissionMap);

    return {
      id: relatedUser.id.toString(),
      permissionMap: permissionMap,
    };
  }
}
