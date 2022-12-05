import { ApiProperty } from '@nestjs/swagger';
import { apiResponseExample } from '../../../../utils/api-response-examples';

export class GetAllUsers {
  @ApiProperty({ example: 15 })
  declare id: number;

  @ApiProperty({ example: 'User name' })
  declare name: string;

  @ApiProperty({ example: apiResponseExample.dateIso })
  declare createdAt: number;
}

export class RegisterNewUser {
  @ApiProperty({ example: 15 })
  declare id: number;

  @ApiProperty({ example: 'User name' })
  declare name: string;

  @ApiProperty({ example: 'test@example.com' })
  declare email: string;

  @ApiProperty({ example: apiResponseExample.dateIso })
  declare createdAt: number;
}
