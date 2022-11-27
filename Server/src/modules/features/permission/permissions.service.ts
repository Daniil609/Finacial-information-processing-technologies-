import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../../../constants/env-variables';
import { PROVIDERS } from '../../../constants/providers';
import { Models } from '../../shared/database/get-models';

@Injectable()
export class PermissionsService {
  constructor(
    private configService: ConfigService<EnvironmentVariables>,
    @Inject(PROVIDERS.MODELS) private models: Models,
  ) {}

  async findAll() {
    const permissions = await this.models.Permission.findAll({
      order: ['seq'],
    });

    return permissions;
  }
}
