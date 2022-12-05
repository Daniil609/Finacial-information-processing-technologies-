import { ApiProperty } from '@nestjs/swagger';
import { apiResponseExample } from '../../../../utils/api-response-examples';

export class GetAllProfiles {
  @ApiProperty({ example: apiResponseExample.uuid })
  declare id: string;

  @ApiProperty({ example: 'User name' })
  declare name: string;

  @ApiProperty({ example: '+375111111111' })
  declare phone: string;

  @ApiProperty({ example: apiResponseExample.uuid })
  declare address_id: string;

  @ApiProperty({ example: 15 })
  declare user_id: string;

  @ApiProperty({ example: apiResponseExample.dateIso })
  declare createdAt: number;
}

export class GetProfileById {
  @ApiProperty({ example: apiResponseExample.uuid })
  declare id: string;

  @ApiProperty({ example: 'User name' })
  declare name: string;

  @ApiProperty({ example: '+375111111111' })
  declare phone: string;

  @ApiProperty({ example: apiResponseExample.uuid })
  declare address_id: string;

  @ApiProperty({ example: 15 })
  declare user_id: string;

  @ApiProperty({ example: apiResponseExample.dateIso })
  declare createdAt: number;
}

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
