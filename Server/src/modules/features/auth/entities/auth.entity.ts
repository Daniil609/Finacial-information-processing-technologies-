import { ApiProperty } from '@nestjs/swagger';
import { apiResponseExample } from '../../../../utils/api-response-examples';

export class RegisterNewUser {
  @ApiProperty({ example: apiResponseExample.uuid })
  declare id: string;

  @ApiProperty({ example: 'User name' })
  declare name: string;

  @ApiProperty({ example: 'test@example.com' })
  declare email: string;

  @ApiProperty({ example: apiResponseExample.dateIso })
  declare createdAt: number;
}

export class Login {
  @ApiProperty({ example: apiResponseExample.uuid })
  declare id: string;

  @ApiProperty({ example: 'User name' })
  declare name: string;

  @ApiProperty({ example: 'test@example.com' })
  declare email: string;

  @ApiProperty({ example: apiResponseExample.dateIso })
  declare createdAt: number;
}
