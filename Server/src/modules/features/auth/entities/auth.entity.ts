import { ApiProperty } from '@nestjs/swagger';
import { apiResponseExample } from '../../../../utils/api-response-examples';

export class RegisterNewUser {
  @ApiProperty({ example: apiResponseExample.uuid })
  declare id: string;

  @ApiProperty({ example: 'User name' })
  declare name: string;

  @ApiProperty({ example: 'test@example.com' })
  declare email: string;

  @ApiProperty({ example: 'username' })
  declare username: number;

  @ApiProperty({ example: '+37511111111' })
  declare phone: number;

  @ApiProperty({ example: apiResponseExample.uuid })
  declare addressId: number;

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
