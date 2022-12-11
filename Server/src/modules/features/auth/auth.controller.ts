import {
  Body,
  ConflictException,
  Controller,
  Request,
  Inject,
  Post,
  Res,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { decorator } from 'src/decorators';
import { Response } from 'express';
import { Public } from 'src/modules/shared/auth/public.decorator';
import { PROVIDERS } from '../../../constants/providers';
import { Models } from '../../shared/database/get-models';
import { UserRegisterDto } from '../users/register.dto';
import { AuthService } from './auth.service';
import * as ResponseEntity from './entities';
import { LocalAuthGuard } from './local-auth.guard';
import { ProfileService } from '../profile/profile.service';

@ApiTags('auth')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(
    @Inject(PROVIDERS.MODELS) private models: Models,
    private readonly service: AuthService,
    private readonly profileService: ProfileService,
  ) {}

  @Post('register')
  @Public()
  @decorator.ApiResponse.internal()
  @decorator.ApiResponse.forbidden()
  @decorator.ApiResponse.unauthorized()
  @decorator.ApiResponse.success({ type: ResponseEntity.RegisterNewUser })
  @ApiBody({
    schema: {},
    examples: {
      a: {
        summary: 'Example request with password',
        description: 'Simple body example',
        value: {
          email: 'bogdan@example.com',
          username: 'Bogdan101',
          password: 'sdfsdfssdfd',
          name: 'first name',
          phone: '+375111111111',
          address: 'example address street, 167',
        },
      },
    },
  })
  async register(@Body() registerDto: UserRegisterDto, @Res() res: Response) {
    const username = registerDto.username;
    const isUserExist = await this.service.existsByUsername(username);

    if (isUserExist) {
      throw new ConflictException(`username:${username} is existed`);
    }
    const email = registerDto.email;
    const isEmailExists = await this.service.existsByEmail(email);
    if (isEmailExists) {
      throw new ConflictException(`email:${email} is existed`);
    }
    const {
      id,
      email: newUserEmail,
      username: newUserUsername,
      createdAt,
    } = await this.service.registerNewUser(registerDto);

    await this.profileService.registerNewProfile(+id);

    const addAddress = await this.profileService.addAddress(registerDto.address);

    //@ts-ignore
    const profile = await this.profileService.updateProfile({
      name: registerDto.name,
      phone: registerDto.phone,
      userId: +id,
      //@ts-ignore
      addressId: addAddress.id,
    });

    res.status(201).send({
      id,
      name: profile.name,
      phone: profile.phone,
      addressId: profile.address_id,
      email: newUserEmail,
      username: newUserUsername,
      createdAt,
    });
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @Public()
  @decorator.ApiResponse.internal()
  @decorator.ApiResponse.forbidden()
  @decorator.ApiResponse.unauthorized()
  @decorator.ApiResponse.success({ type: ResponseEntity.Login })
  @ApiBody({
    schema: {},
    examples: {
      a: {
        summary: 'Example login request',
        description: 'Simple login request',
        value: {
          username: 'Bogdan101',
          password: 'sdfsdfssdfd',
        },
      },
    },
  })
  async login(@Request() req, @Res() res: Response) {
    const loginInfo = await this.service.login(req.user);

    res.status(200).send(loginInfo);
  }
}
