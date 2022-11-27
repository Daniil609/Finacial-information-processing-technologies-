import { ApiProperty } from '@nestjs/swagger';
import { PERMISSION_CODE } from '../../../../constants';
import { apiResponseExample } from '../../../../utils/api-response-examples';

export class GetAllPermissions {
  @ApiProperty({ example: apiResponseExample.uuid })
  declare id: string;

  @ApiProperty({ example: 'Manager' })
  declare name: string;

  @ApiProperty({ example: 'manager', enum: PERMISSION_CODE })
  declare code: number;

  @ApiProperty({ example: ['Off', 'On'] })
  declare levelsText: number;

  @ApiProperty({ example: 0 })
  declare seq: number;

  @ApiProperty({ example: apiResponseExample.dateIso })
  declare createdAt: number;
}
