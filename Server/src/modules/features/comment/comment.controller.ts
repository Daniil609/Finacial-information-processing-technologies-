import { Body, Controller, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { PERMISSION_CODE, PERMISSION_LEVEL } from '../../../constants';
import { decorator } from '../../../decorators';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import * as ResponseEntity from './entities';
import { CommentService } from './comment.service';
import { CommentUploadDto } from './comment.dto';
import { apiResponseExample } from 'src/utils/api-response-examples';

@ApiTags('comments')
@Controller({ path: 'comments', version: '1' })
export class CommentController {
  constructor(private readonly service: CommentService) {}

  @Get('/:productId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @decorator.ApiResponse.internal()
  @decorator.ApiResponse.forbidden()
  @decorator.ApiResponse.unauthorized()
  @decorator.ApiResponse.success({ type: ResponseEntity.GetCommentsByProductId })
  @decorator.Permissions([PERMISSION_CODE.PERMISSIONS, PERMISSION_LEVEL.READ])
  @ApiParam({ name: 'productId', example: apiResponseExample.uuid })
  async getById(@Param('productId') productId, @Res() res: Response) {
    //@ts-ignore
    const productComments = await this.service.findCommentsByProductId(productId);
    res.json(productComments);
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
          text: 'Comment text',
          productId: apiResponseExample.uuid,
          userId: 1,
        },
      },
    },
  })
  async uploadComment(@Body() CommentUploadDto: CommentUploadDto, @Res() res: Response) {
    const { productId, text, userId } = CommentUploadDto;

    await this.service.checkProduct(productId);

    await this.service.checkUser(userId);

    //@ts-ignore
    const newComment = await this.service.addComment({
      product_id: productId,
      text,
      user_id: userId,
    });
    res.json(newComment);
  }
}
