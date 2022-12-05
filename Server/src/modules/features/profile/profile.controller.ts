import { Body, Controller, Get, Param, Put, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Logger } from '@nestjs/common';
import { PERMISSION_CODE, PERMISSION_LEVEL } from '../../../constants';
import { decorator } from '../../../decorators';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import * as ResponseEntity from './entities';
import { ProfileService } from './profile.service';
import { ProfileUpdateDto } from './profile.dto';

@ApiTags('profile')
@Controller({ path: 'profile', version: '1' })
export class ProfileController {
  constructor(private readonly service: ProfileService) {}

  @Get('/:userId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @decorator.ApiResponse.internal()
  @decorator.ApiResponse.forbidden()
  @decorator.ApiResponse.unauthorized()
  @decorator.ApiResponse.success({ type: ResponseEntity.GetProfileById })
  @decorator.Permissions([PERMISSION_CODE.PERMISSIONS, PERMISSION_LEVEL.READ])
  @ApiParam({ name: 'userId', example: 15 })
  async getById(@Param('userId') userId, @Res() res: Response) {
    Logger.log('TeST: log', userId);

    //@ts-ignore
    const userProfile = await this.service.findOneById(userId);
    res.json(userProfile);
  }

  @Put()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @decorator.ApiResponse.internal()
  @decorator.ApiResponse.forbidden()
  @decorator.ApiResponse.unauthorized()
  @decorator.ApiResponse.success({ type: ResponseEntity.GetProfileById })
  @decorator.Permissions([PERMISSION_CODE.PERMISSIONS, PERMISSION_LEVEL.READ])
  @ApiBody({
    schema: {},
    examples: {
      a: {
        summary: 'Example request with password',
        description: 'Simple body example',
        value: {
          name: 'first name',
          phone: '+375111111111',
          address: 'example address street, 167',
          userId: 1,
        },
      },
    },
  })
  async updateProfile(@Body() updateProfileBody: ProfileUpdateDto, @Res() res: Response) {
    const addAddress = await this.service.addAddress(updateProfileBody.address);

    //@ts-ignore
    const userProfile = await this.service.updateProfile({
      name: updateProfileBody.name,
      phone: updateProfileBody.phone,
      userId: +updateProfileBody.userId,
      //@ts-ignore
      addressId: addAddress.id,
    });
    res.json(userProfile);
  }
}
