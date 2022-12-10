import { ApiProperty } from '@nestjs/swagger';
import { apiResponseExample } from '../../../../utils/api-response-examples';

export class GetCommentsByProductId {
  @ApiProperty({ example: apiResponseExample.uuid })
  declare id: string;

  @ApiProperty({ example: 'Comment text' })
  declare text: string;

  @ApiProperty({ example: apiResponseExample.uuid })
  declare product_id: string;

  @ApiProperty({ example: 15 })
  declare user_id: number;

  @ApiProperty({ example: apiResponseExample.dateIso })
  declare createdAt: number;
}

export class UploadComment {
  @ApiProperty({ example: apiResponseExample.uuid })
  declare id: string;

  @ApiProperty({ example: 'Comment text' })
  declare text: string;

  @ApiProperty({ example: apiResponseExample.uuid })
  declare product_id: string;

  @ApiProperty({ example: 15 })
  declare user_id: number;

  @ApiProperty({ example: apiResponseExample.dateIso })
  declare createdAt: number;
}
