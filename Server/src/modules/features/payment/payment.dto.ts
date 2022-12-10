import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateCheckoutSessionDto {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  readonly productId: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly userId: number;
}
