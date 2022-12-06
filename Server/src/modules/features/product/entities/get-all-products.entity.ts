import { ApiProperty } from '@nestjs/swagger';
import { apiResponseExample } from '../../../../utils/api-response-examples';

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

export class GetProductsByUserId {
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
