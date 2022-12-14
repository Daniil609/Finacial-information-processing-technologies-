import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { apiResponseExample } from '../../../../utils/api-response-examples';

// TODO: add more detailed example response with comments and product info
export class GetAllProducts {
  @ApiProperty({ example: apiResponseExample.uuid })
  declare id: string;

  @ApiProperty({ example: 'Product name' })
  declare name: string;

  @ApiProperty({ example: apiResponseExample.dateIso })
  declare manufactureDate: string;

  @ApiProperty({ example: 1500 })
  declare price: number;

  @ApiProperty({ example: 'image' })
  declare image: number;

  @ApiProperty({ example: apiResponseExample.uuid })
  declare type_id: number;

  @ApiProperty({ example: 'Perfect condition' })
  declare condition: string;

  @ApiProperty({ example: 3 })
  declare minAge: number;

  @ApiProperty({ example: 10 })
  declare maxAge: number;

  @ApiProperty({ example: apiResponseExample.uuid })
  declare address_id: string;

  @ApiProperty({ example: 15 })
  declare user_id: string;

  @ApiProperty({ example: apiResponseExample.dateIso })
  declare createdAt: number;
}

export class GetCheckoutSession {
  @ApiProperty({ example: faker.internet.url() })
  declare redirect_url: string;
}

export class GetPaymentHistory {
  @ApiProperty({ example: apiResponseExample.uuid })
  declare id: string;

  @ApiProperty({ example: faker.random.numeric(4) })
  declare amount: string;

  @ApiProperty({ example: 'complete' })
  declare status: string;

  @ApiProperty({ example: 'usd' })
  declare currency: string;

  @ApiProperty({ example: 'deposit' })
  declare payment_type: string;
}
