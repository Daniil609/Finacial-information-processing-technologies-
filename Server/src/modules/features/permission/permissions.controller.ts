import { Controller, Get, Req, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { PERMISSION_CODE, PERMISSION_LEVEL } from '../../../constants';
import { decorator } from '../../../decorators';
import * as ResponseEntity from './entities';
import { PermissionsService } from './permissions.service';

@ApiTags('permissions')
@ApiBearerAuth()
@Controller({ path: 'permissions', version: '1' })
export class PermissionsController {
  constructor(private readonly service: PermissionsService) {}

  @Get()
  @decorator.ApiResponse.internal()
  @decorator.ApiResponse.forbidden()
  @decorator.ApiResponse.unauthorized()
  @decorator.ApiResponse.success({ type: ResponseEntity.GetAllPermissions })
  @decorator.Permissions([PERMISSION_CODE.PERMISSIONS, PERMISSION_LEVEL.READ])
  async getAll(@Req() req: Request, @Res() res: Response) {
    const permissions = await this.service.findAll();
    res.json(permissions);
  }
}
