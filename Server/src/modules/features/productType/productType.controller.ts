import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { PERMISSION_CODE, PERMISSION_LEVEL } from '../../../constants';
import { decorator } from '../../../decorators';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import * as ResponseEntity from './entities';
import { ProductTypeService } from './productType.service';

@ApiTags('product-type')
@Controller({ path: 'product-type', version: '1' })
export class ProductTypeController {
  constructor(private readonly service: ProductTypeService) {}

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
    const products = await this.service.getAllProductTypes();
    res.json(products);
  }

}
