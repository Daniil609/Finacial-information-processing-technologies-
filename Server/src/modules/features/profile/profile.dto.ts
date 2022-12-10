import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from 'class-validator';

export class ProfileDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly userId: string;
}

export class ProfileUpdateDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  @ApiProperty()
  readonly phone: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly address: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly userId: string;
}
