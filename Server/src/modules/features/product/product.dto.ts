import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetProductsByUserIdDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly userId: string;
}

export class ProductUploadDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsNotEmpty()
  @IsISO8601()
  @ApiProperty()
  readonly manufactureDate: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly price: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly image: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly type_id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly condition: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly minAge: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly maxAge: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly address: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly userId: number;
}
