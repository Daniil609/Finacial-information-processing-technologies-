import { Body, Controller, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
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

@ApiTags('product')
@Controller({ path: 'product', version: '1' })
export class ProductController {
  constructor(private readonly service: ProductService) {}

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
    res.json(userProducts);
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
    res.json(products);
  }

  @Post()
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
          image: 'image',
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
  async updateProfile(@Body() uploadProductDto: ProductUploadDto, @Res() res: Response) {
    const {
      address,
      condition,
      image,
      manufactureDate,
      name,
      price,
      type_id,
      userId,
      maxAge,
      minAge,
    } = uploadProductDto;

    const addAddress = await this.service.addAddress(address);

    await this.service.checkTypeId(type_id);

    //@ts-ignore
    const userProfile = await this.service.addProduct({
      name,
      condition,
      image,
      manufactureDate: new Date(manufactureDate),
      price,
      type_id,
      userId,
      //@ts-ignore
      address_id: addAddress.id,
      maxAge,
      minAge,
    });
    res.json(userProfile);
  }
}
