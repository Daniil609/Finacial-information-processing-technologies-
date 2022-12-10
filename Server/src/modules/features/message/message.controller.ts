import { Body, Controller, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { PERMISSION_CODE, PERMISSION_LEVEL } from '../../../constants';
import { decorator } from '../../../decorators';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import * as ResponseEntity from './entities';
import { MessageUploadDto } from './message.dto';
import { MessageService } from './message.service';

@ApiTags('messages')
@Controller({ path: 'messages', version: '1' })
export class MessageController {
  constructor(private readonly service: MessageService) {}

  @Get('/:userId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @decorator.ApiResponse.internal()
  @decorator.ApiResponse.forbidden()
  @decorator.ApiResponse.unauthorized()
  @decorator.ApiResponse.success({ type: ResponseEntity.GetCommentsByProductId })
  @decorator.Permissions([PERMISSION_CODE.PERMISSIONS, PERMISSION_LEVEL.READ])
  @ApiParam({ name: 'userId', example: 1 })
  async getById(@Param('userId') userId, @Res() res: Response) {
    //@ts-ignore
    const userMessages = await this.service.findMessagesByUserId(userId);
    res.json(userMessages);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @decorator.ApiResponse.internal()
  @decorator.ApiResponse.forbidden()
  @decorator.ApiResponse.unauthorized()
  @decorator.ApiResponse.success({ type: ResponseEntity.UploadComment })
  @decorator.Permissions([PERMISSION_CODE.PERMISSIONS, PERMISSION_LEVEL.READ])
  @ApiBody({
    schema: {},
    examples: {
      a: {
        summary: 'Example request with comment data',
        description: 'Simple body example',
        value: {
          text: 'Nu che tam s dengami',
          userFromId: 1,
          userToId: 2,
        },
      },
    },
  })
  async uploadComment(@Body() MessageUploadDto: MessageUploadDto, @Res() res: Response) {
    const { text, userFromId, userToId } = MessageUploadDto;

    await this.service.checkUser(userFromId);

    await this.service.checkUser(userToId);

    //@ts-ignore
    const newMessage = await this.service.addMessage({
      text,
      user_from_id: userFromId,
      user_to_id: userToId,
    });
    res.json(newMessage);
  }
}
