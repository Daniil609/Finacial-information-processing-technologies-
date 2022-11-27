import { Controller, Get, Inject } from '@nestjs/common';
import { PROVIDERS } from '../../../constants/providers';
import { Models } from '../../shared/database/get-models';

@Controller('auth')
export class AuthController {
  constructor(@Inject(PROVIDERS.MODELS) private models: Models) {}

  @Get()
  async getAll() {
    return { success: true };
  }
}
