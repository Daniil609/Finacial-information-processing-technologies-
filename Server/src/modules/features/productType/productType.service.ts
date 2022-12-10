import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../../../constants/env-variables';
import { PROVIDERS } from '../../../constants/providers';
import { Models } from '../../shared/database/get-models';

@Injectable()
export class ProductTypeService {
  constructor(
    private configService: ConfigService<EnvironmentVariables>,
    @Inject(PROVIDERS.MODELS) private models: Models,
  ) {}

  async getAllProductTypes() {
    //@ts-ignore
    const [results] = await this.models.Product.sequelize?.query(
      `SELECT pt.*
        FROM trpo.product_type pt;`,
    );

    if (!results || !results[0]) {
      return [];
    }

    return results;
  }
}
