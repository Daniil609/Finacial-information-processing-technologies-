import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../../../constants/env-variables';
import { PROVIDERS } from '../../../constants/providers';
import { Models } from '../../shared/database/get-models';

@Injectable()
export class ProfileService {
  constructor(
    private configService: ConfigService<EnvironmentVariables>,
    @Inject(PROVIDERS.MODELS) private models: Models,
  ) {}

  async findOne(user_id) {
    const [results] = await this.models.Profile.sequelize?.query(
      `SELECT "id", "name", "phone", "address_id", "user_id", "created_at" AS "createdAt", "updated_at" AS "updatedAt", "user_id" AS "userId" FROM "snmt_skills"."profiles" AS "Profile" WHERE "Profile"."user_id" = ${userid} LIMIT 1;`,
    );
    // const profile = await this.models.Profile.findOne({ where: { user_id } });

    if (!results) {
      throw new NotFoundException('no profile found for this user');
    }

    return results[0];
  }

  async findAll() {
    const users = await this.models.User.findAll();

    return users;
  }

  async registerNewProfile(userId: number) {
    const newProfile = await this.models.Profile.create({ user_id: userId });

    return newProfile;
  }
}
