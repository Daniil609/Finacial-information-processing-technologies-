import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Param,
  ParseFilePipeBuilder,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { PERMISSION_CODE, PERMISSION_LEVEL } from '../../../constants';
import { decorator } from '../../../decorators';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import * as ResponseEntity from './entities';
import { ProductService } from './product.service';
import { ProductUploadDto } from './product.dto';
import { faker } from '@faker-js/faker';
import { apiResponseExample } from 'src/utils/api-response-examples';
import { CommentService } from '../comment/comment.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from '../../../utils/fileUpload';

@ApiTags('product')
@Controller({ path: 'product', version: '1' })
export class ProductController {
  constructor(
    private readonly service: ProductService,
    private readonly commentsService: CommentService,
  ) {}

  @Get('/:userId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @decorator.ApiResponse.internal()
  @decorator.ApiResponse.forbidden()
  @decorator.ApiResponse.unauthorized()
  @decorator.ApiResponse.success({ type: ResponseEntity.GetProductsByUserId })
  @decorator.Permissions([PERMISSION_CODE.PERMISSIONS, PERMISSION_LEVEL.READ])
  @ApiParam({ name: 'userId', example: 15 })
  async getById(@Param('userId') userId, @Res() res: Response) {
    //@ts-ignore
    const userProducts = await this.service.findProductsById(userId);

    const productsWithComments: any = [];

    for (const product of userProducts) {
      const productComments = await this.commentsService.findCommentsByProductId(product.id);
      productsWithComments.push({ comments: productComments, productInfo: product });
    }

    res.json(productsWithComments);
  }

  @Get('/address/:addressId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @decorator.ApiResponse.internal()
  @decorator.ApiResponse.forbidden()
  @decorator.ApiResponse.unauthorized()
  @decorator.ApiResponse.success({ type: ResponseEntity.GetAddressById })
  @decorator.Permissions([PERMISSION_CODE.PERMISSIONS, PERMISSION_LEVEL.READ])
  @ApiParam({ name: 'addressId', example: apiResponseExample.uuid })
  async getAddressById(@Param('addressId') addressId, @Res() res: Response) {
    //@ts-ignore
    const addressInfo = await this.service.findAddressById(addressId);

    res.json(addressInfo);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @decorator.ApiResponse.internal()
  @decorator.ApiResponse.forbidden()
  @decorator.ApiResponse.unauthorized()
  @decorator.ApiResponse.success({ type: ResponseEntity.GetProductsByUserId })
  @decorator.Permissions([PERMISSION_CODE.PERMISSIONS, PERMISSION_LEVEL.READ])
  async getProducts(@Req() req: Request, @Res() res: Response) {
    //@ts-ignore
    const products = await this.service.getAllProducts();

    const productsWithComments: any = [];

    for (const product of products) {
      const productComments = await this.commentsService.findCommentsByProductId(product.id);
      productsWithComments.push({ comments: productComments, productInfo: product });
    }

    res.json(productsWithComments);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './public',
        filename: editFileName,
      }),
    }),
  )
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @decorator.ApiResponse.internal()
  @decorator.ApiResponse.forbidden()
  @decorator.ApiResponse.unauthorized()
  @decorator.ApiResponse.success({ type: ResponseEntity.GetProductsByUserId })
  @decorator.Permissions([PERMISSION_CODE.PERMISSIONS, PERMISSION_LEVEL.READ])
  @ApiBody({
    schema: {},
    examples: {
      a: {
        summary: 'Example request with product data',
        description: 'Simple body example',
        value: {
          name: 'Some product',
          manufactureDate: faker.date.past(10).toISOString(),
          price: 1500,
          type_id: apiResponseExample.uuid,
          condition: 'perfect condition',
          minAge: 3,
          maxAge: 10,
          address: 'example address street, 167',
          userId: 1,
        },
      },
    },
  })
  async updateProfile(
    @Body() uploadProductDto: ProductUploadDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'jpeg',
        })
        .addMaxSizeValidator({
          maxSize: 1024 * 5 * 1000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
    @Res() res: Response,
  ) {
    const { address, condition, manufactureDate, name, price, type_id, userId, maxAge, minAge } =
      uploadProductDto;

    const addAddress = await this.service.addAddress(address);

    await this.service.checkTypeId(type_id);

    //@ts-ignore
    const userProfile = await this.service.addProduct({
      name,
      condition,
      image: file.filename,
      manufactureDate: new Date(manufactureDate),
      price: +price,
      type_id,
      userId: +userId,
      //@ts-ignore
      address_id: addAddress.id,
      maxAge: +maxAge,
      minAge: +minAge,
    });
    res.json(userProfile);
  }
}
