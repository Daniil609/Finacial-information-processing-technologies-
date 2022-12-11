import { Controller, Get, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pj = require('../../../../package.json');

@ApiTags('health')
@Controller({ path: 'health', version: '1' })
export class HealthController {
  constructor() {}

  @Get()
  async healthCheck(@Res() res: Response) {
    res.json({ version: pj.version });
  }
}
