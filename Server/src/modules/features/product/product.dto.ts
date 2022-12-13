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
  @IsString()
  @ApiProperty()
  readonly description: string;

  @IsNotEmpty()
  @IsISO8601()
  @ApiProperty()
  readonly manufactureDate: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly price: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly type_id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly condition: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly minAge: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly maxAge: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly address: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly userId: string;
}
