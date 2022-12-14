import {
  BadRequestException,
  Body,
  Controller,
  Headers,
  Post,
  Req,
  Res,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { PERMISSION_CODE, PERMISSION_LEVEL } from '../../../constants';
import { decorator } from '../../../decorators';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import * as ResponseEntity from './entities';
import { PaymentService } from './payment.service';
import { CreateCheckoutSessionDto } from './payment.dto';
import { apiResponseExample } from 'src/utils/api-response-examples';
import { CommentService } from '../comment/comment.service';
import { ProductService } from '../product/product.service';
import RequestWithRawBody from '../../../interfaces';
import Stripe from 'stripe';

@ApiTags('payment')
@Controller({ path: 'payment', version: '1' })
export class PaymentController {
  constructor(
    private readonly service: PaymentService,
    private readonly commentService: CommentService,
    private readonly productService: ProductService,
  ) {}

  @Post('create-checkout-session')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @decorator.ApiResponse.internal()
  @decorator.ApiResponse.forbidden()
  @decorator.ApiResponse.unauthorized()
  @decorator.ApiResponse.success({ type: ResponseEntity.GetCheckoutSession })
  @decorator.Permissions([PERMISSION_CODE.PERMISSIONS, PERMISSION_LEVEL.READ])
  @ApiBody({
    schema: {},
    examples: {
      a: {
        summary: 'Example request with product data',
        description: 'Simple body example',
        value: {
          productId: apiResponseExample.uuid,
          userId: 1,
        },
      },
    },
  })
  async createCheckoutSession(
    @Body() CreateCheckoutSessionDto: CreateCheckoutSessionDto,
    @Res() res: Response,
  ) {
    const { productId, userId } = CreateCheckoutSessionDto;

    const product = await this.productService.findProductByProductId(productId);
    await this.commentService.checkUser(userId);

    const response = await this.service.createCheckoutSession(product.price, userId, productId);

    res.json({ redirect_url: response.url });
  }

  @Get('/history')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @decorator.ApiResponse.internal()
  @decorator.ApiResponse.forbidden()
  @decorator.ApiResponse.unauthorized()
  @decorator.ApiResponse.success({ type: ResponseEntity.GetPaymentHistory })
  @decorator.Permissions([PERMISSION_CODE.PERMISSIONS, PERMISSION_LEVEL.READ])
  async getPaymentsHistory(@Request() req, @Res() res: Response) {
    const {
      user: { userId },
    } = req;

    const paymentsDetails = await this.service.getPaymentsHistoryByUserId(userId);

    res.json(paymentsDetails);
  }

  @Post('webhook')
  async handleIncomingEvents(
    @Headers('stripe-signature') signature: string,
    @Req() request: RequestWithRawBody,
    @Res() response: Response,
  ) {
    if (!signature) {
      throw new BadRequestException('Missing stripe-signature header');
    }
    const event: Stripe.Event = await this.service.constructEventFromPayload(
      signature,
      request.rawBody,
    );

    await this.service.handlePaymentWebhook(event);

    response.sendStatus(200);
  }
}
