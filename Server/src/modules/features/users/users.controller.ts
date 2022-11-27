import { Body, ConflictException, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { PERMISSION_CODE, PERMISSION_LEVEL } from '../../../constants';
import { decorator } from '../../../decorators';
import * as ResponseEntity from './entities';
import { UserRegisterDto } from './register.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@ApiBearerAuth()
@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post()
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
          password: 'sdfsdfs',
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
    const newUser = await this.service.registerNewUser(registerDto);
    res.status(201).send(newUser);
  }

  @Get()
  @decorator.ApiResponse.internal()
  @decorator.ApiResponse.forbidden()
  @decorator.ApiResponse.unauthorized()
  @decorator.ApiResponse.success({ type: ResponseEntity.GetAllUsers })
  @decorator.Permissions([PERMISSION_CODE.PERMISSIONS, PERMISSION_LEVEL.READ])
  async getAll(@Req() req: Request, @Res() res: Response) {
    const users = await this.service.findAll();
    res.json(users);
  }
}
