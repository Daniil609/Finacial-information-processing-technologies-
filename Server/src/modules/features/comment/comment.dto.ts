import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CommentUploadDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly text: string;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  readonly productId: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly userId: number;
}
