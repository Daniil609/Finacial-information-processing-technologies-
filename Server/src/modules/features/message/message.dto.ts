import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class MessageUploadDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly text: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly userFromId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly userToId: number;
}
