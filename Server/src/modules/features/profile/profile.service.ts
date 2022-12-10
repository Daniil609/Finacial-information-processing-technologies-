import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { EnvironmentVariables } from '../../../constants/env-variables';
import { PROVIDERS } from '../../../constants/providers';
import { Models } from '../../shared/database/get-models';

@Injectable()
export class ProfileService {
  constructor(
    private configService: ConfigService<EnvironmentVariables>,
    @Inject(PROVIDERS.MODELS) private models: Models,
  ) {}

  async findOneByUsername(username: string) {
    //@ts-ignore
    const [results] = await this.models.Profile.sequelize?.query(
      `SELECT u."id" as userId,
            p.id as profileId,
            "name",
            "phone",
            "address_id",
            "user_id",
            u."created_at" AS "createdAt",
            u."updated_at" AS "updatedAt"
      FROM "trpo"."profiles" as p
              JOIN trpo.users u on p.user_id = u.id
      where u.username = ${username};`,
    );

    if (!results || !results[0]) {
      throw new NotFoundException('no profile found for this user');
    }

    return results[0];
  }

  async findOneById(userId: number) {
    //@ts-ignore
    const [results] = await this.models.Profile.sequelize?.query(
      `SELECT p.id           as profileId,
            "name",
            "phone",
            "address_id",
            "user_id",
            p."created_at" AS "createdAt",
            p."updated_at" AS "updatedAt"
      FROM "trpo"."profiles" as p
      where p.user_id = :userId ;`,
      { replacements: { userId } },
    );

    if (!results || !results[0]) {
      throw new NotFoundException('no profile found for this user');
    }

    return results[0];
  }

  async updateProfile(params: { userId: number; name: string; phone: string, addressId: string }) {
    const { name, phone, userId, addressId } = params;

    //@ts-ignore
    const [results] = await this.models.Profile.sequelize?.query(
      `UPDATE trpo.profiles
      SET name  = :name,
          phone = :phone,
          address_id = :addressId
      WHERE user_id = :userId RETURNING *;
      `,
      { replacements: { userId, name, phone, addressId } },
    );

    if (!results || !results[0]) {
      throw new NotFoundException('no profile found for this user');
    }

    return results[0];
  }

  async addAddress(address: string) {
    //@ts-ignore
    const [results] = await this.models.Region.sequelize?.query(
      `INSERT INTO trpo.regions (id, name, type, parent_id, created_at, updated_at)
      VALUES (DEFAULT, :address, 'address', null, DEFAULT, DEFAULT) RETURNING *;
      `,
      { replacements: { address } },
    );

    if (!results || !results[0]) {
      throw new NotFoundException('cannot create new region');
    }

    return results[0];
  }

  async registerNewProfile(userId: number) {
    //@ts-ignore
    const [results] = await this.models.Profile.sequelize?.query(
      `INSERT INTO trpo.profiles (id, name, phone, address_id, user_id, created_at, updated_at)
      VALUES (DEFAULT, null, null, null, :userId, DEFAULT, DEFAULT) RETURNING *;
      `,
      { replacements: { userId } },
    );

    if (!results || !results[0]) {
      throw new NotFoundException('cannot create new profile');
    }

    return results[0];
  }
}
